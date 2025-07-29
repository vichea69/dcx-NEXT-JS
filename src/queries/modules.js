import { Module } from "@/model/module.model";

export async function create(mdouleData) {
    try {
        const module = await Module.create(mdouleData);
        return JSON.parse(JSON.stringify(module));
    } catch (error) {
        throw new Error(error);
    }
}