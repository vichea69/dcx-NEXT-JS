
import { Category } from "../model/category-model.js";
import { Course } from "../model/course-model.js";
import { User } from "../model/user-model.js";
import connectToDB from "../service/mongo.js";

export async function getCourses() {
    await connectToDB();
    const courses = await Course.find({}).populate({
        path : "category",
        model: Category,
    }).populate({
        path: "instructor",
        model: User,
    });
    
    // console.log(courses);
    return courses;
}