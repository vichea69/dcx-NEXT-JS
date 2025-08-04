"use server"
import { Quizset } from "@/model/quizset-model";
import { getSlug } from './../../lib/convertData';
import { createQuiz } from "@/queries/quizzes";
import { Quiz } from "@/model/quizzes-model";


export async function updateQuizSet(quizset, dataToUpdate) {
    try {
        await Quizset.findByIdAndUpdate(quizset, dataToUpdate);

    } catch (error) {
        throw new Error(error);
    }
}

export async function addQuizToQuizSet(quizSetId, quizData) {
    try {
        //console.log(quizSetId,quizData);
        const transformedQuizData = {};
        transformedQuizData["title"] = quizData["title"];
        transformedQuizData["description"] = quizData["description"];
        transformedQuizData["slug"] = getSlug(quizData["title"]);
        transformedQuizData["options"] = [
            {
                text: quizData.optionA.label,
                is_correct: quizData.optionA.isTrue
            },
            {
                text: quizData.optionB.label,
                is_correct: quizData.optionB.isTrue
            },
            {
                text: quizData.optionC.label,
                is_correct: quizData.optionC.isTrue
            },
            {
                text: quizData.optionD.label,
                is_correct: quizData.optionD.isTrue
            },
        ];
        //console.log(transformedQuizData);

        const createdQuizId = await createQuiz(transformedQuizData);

        const quizSet = await Quizset.findById(quizSetId);
        quizSet.quizIds.push(createdQuizId);
        quizSet.save();
    } catch (error) {
        throw new Error(error);
    }
}
export async function deleteQuiz(quizSetId, quizId) {
    try {

        await Quizset.findByIdAndUpdate(quizSetId, {
            $pull: { quizIds: quizId }
        });

        await Quiz.findByIdAndDelete(quizId);

    } catch (error) {
        throw new Error(error);
    }
}
export async function changeQuizPublishState(quizSetId) {
    const quiz = await Quizset.findById(quizSetId);
    try {
        const res = await Quizset.findByIdAndUpdate(quizSetId, { active: !quiz.active }, { lean: true });
        return res.active;
    } catch (error) {
        throw new Error(error);
    }
}
export async function doCreateQuizSet(data) {
    try {
        data['slug'] = getSlug(data.title);
        const createdQuizSet = await Quizset.create(data);
        return createdQuizSet?._id.toString();
    } catch (error) {
        throw new Error(error);
    }

}