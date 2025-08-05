import mongoose, { Schema } from "mongoose";

const watchSchema = new Schema({
    state: {
        required: true,
        type: String,
        default: "started"
    },
    created_at: {
        required: true,
        type: Date,
        default: Date.now()
    },
    modified_at: {
        required: true,
        type: Date,
        default: Date.now()
    },
    lesson: { type: Schema.ObjectId, ref: "Lesson" },
    module: { type: Schema.ObjectId, ref: "Module" },
    user: { type: Schema.ObjectId, ref: "User" },
    lastTime: {
        required: true,
        type: Number,
        default: 0
    },

});
export const Watch = mongoose.models.Watch ?? mongoose.model("Watch", watchSchema);