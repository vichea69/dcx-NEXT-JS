"use server"
import { getLoggedInUser } from "@/lib/loggedin-user"
import { create } from "@/queries/courses";
import {Course} from "@/model/course-model.js";

export async function createCourse(data){
    try {
        const loggedinUser = await getLoggedInUser();
        data["instructor"] = loggedinUser?.id
        const course = await create(data);
        return course;
    } catch (e) {
        throw new Error(e);
    }
}

export async function updateCourse(courseId, dataToUpdate) {
    try {
        await Course.findByIdAndUpdate(courseId,dataToUpdate);

    }catch(error){
        throw new Error(error);
    }
}