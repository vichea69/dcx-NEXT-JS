import { auth } from "@/auth"
import { NextResponse } from "next/server";
import {getUserByEmail} from "@/queries/user.js";
import connectToDB from "../../../../service/mongo.js";

export const GET = async (request) => {
    const session = await auth();
    if (!session?.user) {
        return new NextResponse("Unauthorized", {
            status: 401,
        })
    }
    await connectToDB()

    try {
        const user = await getUserByEmail(session?.user?.email);
        return new NextResponse(JSON.stringify(user), {
            status: 200,
        })

    } catch (err) {
        return new NextResponse(err.message, {
            status: 500,
        })
    }

}