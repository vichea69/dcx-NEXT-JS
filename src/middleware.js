import { authConfig } from "./auth.config";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { LOGIN, PUBLIC_ROUTES ,ROOT } from "@/lib/route";

const {auth} = NextAuth(authConfig);
export default auth((res)=>{
    const {nextUrl} = res;
    const isAuthenticated = !!res.auth
    const isPublicRoute = PUBLIC_ROUTES.some(route => nextUrl.pathname.startsWith(route)) || nextUrl.pathname === ROOT;
    // Allow access to public routes or if the user is authenticated
    if (!isAuthenticated && !isPublicRoute) {
        return NextResponse.redirect(new URL(LOGIN, nextUrl));
    }
    return NextResponse.next();
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|assets).*)"],
}