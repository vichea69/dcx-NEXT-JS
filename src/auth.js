// auth.js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { User } from "@/model/user-model.js";
import { authConfig } from "./auth.config";

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
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials) return null;

                try {
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
                        name: user.name,
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
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
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