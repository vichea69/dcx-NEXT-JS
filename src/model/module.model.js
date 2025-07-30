import mongoose, {Schema, Types as Shema} from "mongoose";

const moduleSchema = new Schema({
    title:{
        required: true,
        type: String
    },
    description:{
        type: String
    },
    active:{
        required: true,
        default: false,
        type: Boolean
    },
    slug:{
        required: true,
        type: String
    },
    course:{
        required: true,
        type: Shema.ObjectId
    },
    lessonIds:{
        
        type: [Shema.ObjectId],
        ref: "Lesson"
    },
    order:{
        required: true,
        type: Number
    },
     
});
export const Module = mongoose.models.Module ?? mongoose.model("Module",moduleSchema);