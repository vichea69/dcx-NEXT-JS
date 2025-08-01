import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/lib/convertData";
import { Quizset } from "@/model/quizset-model";
import { Quiz } from "@/model/quizzes-model";


export async function getAllQuizSets(excludeUnPublished) {
    try {
        let quizSets = [];
        if (excludeUnPublished) {
            quizSets = await Quizset.find({ active: true }).lean();
        } else {
            quizSets = await Quizset.find().lean();
        }
        return replaceMongoIdInArray(quizSets);
    } catch (error) {
        throw new Error(error);
    }
}

export async function getQuizSetById(id) {
    try {
        const quizSet = await Quizset.findById(id)
            .populate({
                path: "quizIds",
                model: Quiz,
            }).lean();
        return replaceMongoIdInObject(quizSet);
    } catch (error) {
        throw new Error(error);
    }
}