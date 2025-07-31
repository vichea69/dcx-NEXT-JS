"use server";

import { Lesson } from "@/model/lesson.model";
import { Module } from "@/model/module.model";
import { create } from "@/queries/lessons";

// Create a new lesson and link to module
export async function createLesson(data) {
    try {
        const title = data.get("title");
        const slug = data.get("slug");
        const moduleId = data.get("moduleId");
        const order = parseInt(data.get("order"));

        const createdLesson = await create({ title, slug, order });

        // ✅ Avoid using reserved word "module"
        const lessonModule = await Module.findById(moduleId);
        if (!lessonModule) {
            throw new Error("Module not found");
        }

        lessonModule.lessonIds.push(createdLesson._id);
        await lessonModule.save(); // ✅ Don't forget 'await'

        return createdLesson;
    } catch (err) {
        throw new Error(err.message || "Failed to create lesson");
    }
}

// Reorder lessons based on new positions
export async function reOrderLesson(data) {
    try {
        await Promise.all(
            data.map(async (element) => {
                await Lesson.findByIdAndUpdate(element.id, {
                    order: element.position,
                });
            })
        );
    } catch (err) {
        throw new Error(err.message || "Failed to reorder lessons");
    }
}

// Update an existing lesson
export async function updateLesson(lessonId, data) {
    try {
        await Lesson.findByIdAndUpdate(lessonId, data);
    } catch (err) {
        throw new Error(err.message || "Failed to update lesson");
    }
}