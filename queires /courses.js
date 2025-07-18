import { Course } from "../model/course-model.js";
import connectToDB from "../service/mongo.js";

export async function getCourses() {
    await connectToDB();
    const courses = await Course.find({});
    // console.log(courses);
    return courses;
}