import { Category } from "@/model/category-model";
import { Course } from "@/model/course-model";
import { Module } from "@/model/module.model";
import { Testimonial } from "@/model/testimonial-model";
import { User } from "@/model/user-model";
import { replaceMongoIdInArray , replaceMongoIdInObject} from "@/lib/convertData.js";
import connectToDB from "../../service/mongo.js";
import { getEnrollmentsForCourse } from "./enrollments.js";
import { getTestimonialsForCourse } from "./testimonials.js";

export async function getCourseList() {
    const db = await connectToDB();
    const courses = await Course.find({}).select(["title","subtitle","thumbnail","modules","price","category","instructor"]).populate({
        path: "category",
        model: Category
    }).populate({
        path: "instructor",
        model: User
    }).populate({
        path: "testimonials",
        model: Testimonial
    }).populate({
        path: "modules",
        model: Module
    }).lean();
    return replaceMongoIdInArray(courses);
};
export async function getCourseDetails(id) {
    const db = await connectToDB();
    const course = await Course.findById(id)
    .populate({
        path: "category",
        model: Category
    }).populate({
        path: "instructor",
        model: User
    }).populate({
        path: "testimonials",
        model: Testimonial,
        populate: {
            path: "user",
            model: User
        }
    }).populate({
        path: "modules",
        model: Module
    }).lean();
    return replaceMongoIdInObject(course);
}
export async function getCourseDetailsByInstructor(instructorId){
const courses = await Course.find({instructor: instructorId }).
populate({
    path: "category",
    model: Category
}).populate({
    path: "instructor",
    model: User
}).lean();

    const enrollments = await Promise.all(
        courses.map(async (course) => {
            const enrollment = await getEnrollmentsForCourse(course.
                _id.toString());
                return enrollment;
        })
    );


    const totalEnrollments = enrollments.reduce(( acc,obj )=> {
        return acc + obj.length;
    });

    const tesimonials = await Promise.all(
        courses.map(async (course) => {
            const tesimonial = await getTestimonialsForCourse(course.
                _id.toString());
                return tesimonial;
        })
    );

    const totalTestimonials = tesimonials.flat();
    const avgRating = (totalTestimonials.reduce(function (acc, obj) {
        return acc + obj.rating;
    },0)) / totalTestimonials.length;


    const firstName = courses.length > 0 ? courses[0].instructor?.firstName : "Unknown";
    const lastName = courses.length > 0 ? courses[0].instructor?.lastName : "Unknown";
    const designation = courses.length > 0 ? courses[0].instructor?.designation : "Unknown";
    const insImage = courses.length > 0 ? courses[0].instructor?.profilePicture : "Unknown";


    return {
        "courses" : courses.length,
        "enrollments": totalEnrollments,
        "reviews" : totalTestimonials.length,
        "ratings" : avgRating.toPrecision(2),
        "inscourses" : courses,
        firstName,
        lastName,
        designation,
        insImage,
    }
}