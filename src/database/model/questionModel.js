import mongoose from "mongoose";
import QuestionSchema from "../schema/questionSchema.js";

const questionModel = mongoose.model("Question", QuestionSchema);

export default questionModel;