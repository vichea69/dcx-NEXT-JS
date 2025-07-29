import "server-only";
import {auth} from "@/auth.js";
import {getUserByEmail} from "@/queries/user.js";

export async function getLoggedInUser() {
    const session = await auth();
    if (!session?.user)return null;

    return getUserByEmail(session?.user?.email)
}
