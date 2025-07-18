// import mongoose, { Schema } from "mongoose";
// const courseSchema = new Schema({
//     title: {
//         required: true,
//         type: String
//     },
//     subtitle: {
//         required: true,
//         type: String
//     },
//
//     description: {
//         required: true,
//         type: String
//     },
//     thumbnail: {
//         required: true,
//         type: String
//     },
//     modules: {
//         required: true,
//         type: Schema.ObjectId
//     },
//     price: {
//         required: true,
//         type: Number
//     },
//     active: {
//         required: true,
//         type: Boolean
//     },
//     category: {
//         required: true,
//         type: Schema.ObjectId
//     },
//     instructor: {
//         required: true,
//         type: Schema.ObjectId
//     },
//     testimonials: {
//         required: true,
//         type: Schema.ObjectId
//     },
//     quizSet: {
//         required: true,
//         type: Schema.ObjectId
//     },
//     learning:{
//         required: true,
//         type: Schema.ObjectId
//     },
//     createdOn: {
//         type: Date,
//         default: Date.now
//     },
//     modifiedOn: {
//         type: Date,
//         default: Date.now
//     }
//
// }, {
//     timestamps: true
// });
//
// export const Course = mongoose.models.Course ?? mongoose.model("Course", courseSchema);