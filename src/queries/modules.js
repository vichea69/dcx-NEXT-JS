import { replaceMongoIdInObject } from "@/lib/convertData";
import { Lesson } from "@/model/lesson.model";
import { Module } from "@/model/module.model";
import connectToDB from "../../service/mongo";

export async function create(mdouleData) {
    try {
        const module = await Module.create(mdouleData);
        return JSON.parse(JSON.stringify(module));
    } catch (error) {
        throw new Error(error);
    }
}
export async function getModule(moduleId){
    const db = await connectToDB();
    try {
        const module = await Module.findById(moduleId).
        populate({
            path: "lessonIds",
            model: Lesson
        }).lean();
        return replaceMongoIdInObject(module);
    } catch (error) {
        throw new Error(error);
    }
}