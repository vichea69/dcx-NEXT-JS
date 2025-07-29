'use server'
import {getLoggedInUser} from "@/lib/loggedin-user.js";
export async function createCourse(data){
    try{
        const loggedInUser = await getLoggedInUser();
        data["instructor"] = loggedInUser?.id;
        const course = await createCourse(data);
        return course;

    }catch (error) {
        throw new Error(error);
    }
}