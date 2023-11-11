import mongoose from "mongoose";

const ExamSchema = new mongoose.Schema({
    name: { type: String, required: true, index: "text" },
    password: { type: String, required: true },
    isLocked: { type: Boolean, default: false },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},
    { timestamps: true }
)

export default ExamSchema;