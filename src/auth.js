// auth.js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { User } from "@/model/user-model.js";
import { authConfig } from "./auth.config";
import connectToDB from "../service/mongo.js";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    secret: process.env.NEXTAUTH_SECRET, // add this in your .env file!

    // Spread only safe config (not providers!)
    session: authConfig.session,

    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials) return null;

                try {
                    await connectToDB();
                    const user = await User.findOne({ email: credentials.email });

                    if (!user) {
                        console.error("❌ User not found");
                        throw new Error("No user with that email");
                    }

                    const isMatch = await bcrypt.compare(credentials.password, user.password);
                    if (!isMatch) {
                        console.error("❌ Wrong password");
                        throw new Error("Incorrect password");
                    }

                    console.log("✅ Logged in user:", user);
                    return {
                        id: user._id.toString(),
                        name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
                        email: user.email,
                        role: user.role
                    };

                } catch (err) {
                    console.error("❌ Auth error", err);
                    throw new Error("Login failed. Please try again.");
                }
            }
        })
    ],


    callbacks: {
        async signIn({ user, account, profile, req }) {
            try {
                if (account?.provider !== "google") return true;

                await connectToDB();

                const email = user.email;
                if (!email) return false;

                let existingUser = await User.findOne({ email });

                const givenName = profile?.given_name || user?.given_name || "";
                const familyName = profile?.family_name || user?.family_name || "";
                const fullName = user.name || profile?.name || "";
                let derivedFirst = givenName;
                let derivedLast = familyName;
                if (!derivedFirst && !derivedLast) {
                    const parts = fullName.trim().split(/\s+/).filter(Boolean);
                    derivedFirst = parts[0] || "User";
                    derivedLast = parts.slice(1).join(" ") || "Google";
                }

                // role from cookie if present
                const cookieHeader = req?.headers?.get?.("cookie") || "";
                console.log("[NextAuth signIn] cookie header:", cookieHeader);
                const match = cookieHeader.match(/registerRole=([^;]+)/);
                const intendedRole = match?.[1] === "instructor" || match?.[1] === "student" ? match[1] : "student";
                console.log("[NextAuth signIn] derived intendedRole:", intendedRole);

                const picture = user.image || profile?.picture;
                const randomPassword = await bcrypt.hash(
                    `${Date.now()}-${Math.random().toString(36).slice(2)}`,
                    5
                );

                // Upsert to avoid duplicates or validation failures
                const upserted = await User.findOneAndUpdate(
                    { email },
                    {
                        $set: {
                            firstName: derivedFirst,
                            lastName: derivedLast,
                            profilePicture: picture ?? undefined,
                        },
                        $setOnInsert: {
                            email,
                            password: randomPassword,
                            role: intendedRole,
                            socialMedia: { google: profile?.sub || undefined },
                        },
                    },
                    { new: true, upsert: true }
                );
                existingUser = upserted;
                console.log("[NextAuth signIn] upserted user id & role:", upserted?._id?.toString?.(), upserted?.role);

                // Optional upgrade: if user already existed as student but intent is instructor, upgrade role
                if (existingUser && intendedRole === "instructor" && upserted?.role !== "instructor") {
                    await User.updateOne({ _id: upserted._id }, { $set: { role: "instructor" } });
                    console.log("[NextAuth signIn] upgraded existing user role to instructor", upserted?._id?.toString?.());
                }

                return true;
            } catch (error) {
                console.error("❌ Google sign-in error", error);
                return false;
            }
        },
        async jwt({ token, user }) {
            try {
                // Prefer DB data for both credentials and OAuth
                const emailFromUser = user?.email ?? token?.email;
                if (!emailFromUser) return token;

                await connectToDB();
                const dbUser = await User.findOne({ email: emailFromUser });
                if (dbUser) {
                    token.id = dbUser._id.toString();
                    token.role = dbUser.role;
                    token.email = dbUser.email;
                    token.name = `${dbUser.firstName ?? ""} ${dbUser.lastName ?? ""}`.trim();
                }
            } catch (e) {
                console.error("❌ JWT callback DB fetch failed", e);
            }
            return token;
        },
        async session({ session, token }) {
            if (token?.id) {
                session.user.id = token.id;
                session.user.role = token.role;
            }
            return session;
        }
    },

    pages: {
        signIn: "/login", // redirect to your custom login page
    }
});