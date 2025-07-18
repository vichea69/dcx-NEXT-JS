import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },

    // ✅ modules is an array of ObjectIds
    modules: [{
        type: Schema.Types.ObjectId,
        ref: "Module", // optional
    }],

    price: {
        type: Number,
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
    },

    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    instructor: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    // ✅ testimonials is an array of subdocuments (from your Compass screenshot)
    testimonials: [{
        quizSet: {
            type: Schema.Types.ObjectId,
            ref: "Quiz",
        },
        subtitle: {
            type: String,
        },
    }],

    // ✅ learning is an array of strings
    learning: [{
        type: String,
    }],

    createdOn: {
        type: Date,
        default: Date.now,
    },
    modifiedOn: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});

export const Course = mongoose.models.Course ?? mongoose.model("Course", courseSchema);