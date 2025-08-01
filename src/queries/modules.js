import { replaceMongoIdInObject } from "@/lib/convertData";
import { Lesson } from "@/model/lesson.model";
import { Module } from "@/model/module.model";
import connectToDB from "../../service/mongo";

export async function create(moduleData) {
    try {
        const newModule = await Module.create(moduleData); // ✅ renamed variable
        return JSON.parse(JSON.stringify(newModule));
    } catch (error) {
        throw new Error(error);
    }
}

export async function getModule(moduleId) {
    const db = await connectToDB();
    try {
        const fetchedModule = await Module.findById(moduleId)
            .populate({
                path: "lessonIds",
                model: Lesson,
            })
            .lean();

        const result = replaceMongoIdInObject(fetchedModule);

        console.log("✅ Fetched module:", result); // ← HERE!

        return result;
    } catch (error) {
        console.error("❌ Error fetching module:", error);
        throw new Error(error);
    }
}