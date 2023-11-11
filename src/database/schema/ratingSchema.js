import mongoose from "mongoose";
/*
var studentScore = new mongoose.Schema({
    studentID: {type: mongoose.Schema.Types.ObjectId, required: true},
    submition: {
        type: [{
            correctAns: {type: Number, required: true},
            time: {type: Number, required: true}
        }],
        required: true
    }
})

const RatingSchema = new mongoose.Schema({
    id : {type:  mongoose.Schema.Types.ObjectId , required: true, unique: true ,ref: "Exams"},
    submit : {type: [[
        studentScore
    ]], required: true}
});
*/

const RatingSchema = new mongoose.Schema({
    examID : {type:  mongoose.Schema.Types.ObjectId , required: true, },
    studentID: {type:  mongoose.Schema.Types.ObjectId , required: true, },
    correctAns: {type: Number, required: true},
    time: {type: Number, required: true}
});

export default RatingSchema;