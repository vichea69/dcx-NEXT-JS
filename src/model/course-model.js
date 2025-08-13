import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema({
    title: {
        required: true,
        type: String
    },
    // Khmer localized fields
    titleKh: {
        type: String,
        default: undefined,
    },
    subtitle: {
        type: String,
        default: "subtitle"
    },
    subtitleKh: {
        type: String,
        default: undefined,
    },
    description: {
        required: true,
        type: String
    },
    descriptionKh: {
        type: String,
        default: undefined,
    },
    thumbnail: {
        type: String
    },
    modules: {
        required: true,
        type: [Schema.ObjectId]
    },
    price: {
        required: true,
        default: 0,
        type: Number
    },
    active: {
        required: true,
        default: false,
        type: Boolean
    },
    category: { type: Schema.ObjectId, ref: "Category" },

    instructor: { type: Schema.ObjectId, ref: "User" },

    testimonials: [{ type: Schema.ObjectId, ref: "Testimonial" }],

    quizSet: {
        type: Schema.ObjectId
    },
    learning: {
        type: [String]
    },
    createdOn: {
        required: true,
        default: Date.now(),
        type: Date
    },
    modifiedOn: {
        required: true,
        default: Date.now(),
        type: Date
    },
});
export const Course = mongoose.models.Course ?? mongoose.model("Course", courseSchema);