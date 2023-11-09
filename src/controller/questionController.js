import examModel from "../database/model/examModel.js";
import userModel from "../database/model/userModel.js";
import questionModel from "../database/model/questionModel.js"; 

export const createQuestion = async (req, res) => {
    try {
        if (!req.body.examId || !req.body.title || !req.body.options || !req.body.answer) {
            return res.status(500).json({
                message: 'Missing input!',
                status: 500
            })
        }

        const findExam = await examModel.findById(req.body.examId);
        if (!findExam) {
            return res.status(404).json({
                message: 'Not found exam'
            })
        }
        const question = new questionModel({
            title: req.body.title,
            options: req.body.options,
            answer: req.body.answer,
            exam: findExam
        });
        await question.save();

        return res.status(200).json({
            message: 'Create question successful!'
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json(error.message);
    }
}