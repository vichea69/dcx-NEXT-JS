"use server"
import { getLoggedInUser } from "@/lib/loggedin-user"
import { create } from "@/queries/courses";
import { Course } from "@/model/course-model.js";

export async function createCourse(data) {
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
        await Course.findByIdAndUpdate(courseId, dataToUpdate);

    } catch (error) {
        throw new Error(error);
    }
}
export async function changeCoursePublishState(courseId) {
    const course = await Course.findById(courseId);
    try {
        const res = await Course.findByIdAndUpdate(courseId, { active: !course.active }, { lean: true });
        return res.active

    } catch (error) {
        throw new Error(error);
    }

}

export async function deleteCourse(courseId) {
    try {
        await Course.findByIdAndDelete(courseId);
    } catch (err) {
        throw new Error(err);
    }
}