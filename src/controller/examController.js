import examModel from "../database/model/examModel.js";
import userModel from "../database/model/userModel.js";
import questionModel from "../database/model/questionModel.js";
import { saveScore } from "./ratingController.js";

export const getAllExamByTeacher = async (req, res) => {
    try {
        const findTeacher = await userModel.findById(req.user._id)
        if (!findTeacher) {
            return res.status(404).json({
                message: 'Not found teacher'
            })
        }

        const findAllExamByTeacher = await examModel.find({ owner: req.user._id });
        return res.status(200).json({
            message: 'OK',
            data: {
                user: findTeacher.name,
                email: findTeacher.email,
                exam: findAllExamByTeacher
            }
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json(error.message);
    }
}

export const createExam = async (req, res) => {
    try {
        if (!req.body.name || !req.body.password) {
            return res.status(500).json({
                message: 'Missing input!',
                status: 500
            })
        }

        const findTeacher = await userModel.findById(req.user._id);
        if (!findTeacher) {
            return res.status(404).json({
                message: 'Not found teacher'
            })
        }
        const exam = new examModel({
            name: req.body.name,
            password: req.body.password,
            owner: findTeacher
        });
        await exam.save();

        return res.status(200).json({
            message: 'Create exam successful!'
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json(error.message);
    }
}

export const getExam = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(500).json({
                message: 'Missing input!',
                status: 500
            })
        }
        const findExam = await examModel.findById(req.params.id);
        const questions = await questionModel.find({ exam: findExam });
        findExam.questions = questions;
        return res.status(200).json({
            message: 'OK',
            data: {
                ...findExam._doc, questions
            }
        })
    } catch (e) {
        return res.status(500).json(e.message)
    }
}

export const lockExam = async (req, res) => {
    try {
        if (!req.params.examId) {
            return res.status(500).json({
                message: 'Missing input!',
                status: 500
            })
        }
        const findExam = await examModel.findById(req.params.examId);
        if (!findExam) {
            return res.status(500).json({
                message: 'Missing input!',
                status: 500
            })
        }

        findExam.isLocked = !findExam.isLocked;
        await findExam.save();

        return res.status(200).json({
            message: 'OK'
        })
    } catch (e) {
        return res.status(500).json(e.message)

    }
}

export const submitExam = async (req, res) => {
    try {
        const findQuestions = await questionModel.find({ exam: req.body.examId });
        const answers = req.body.answers;
        let score = 0;
        answers.map((answer) => {
            const question = findQuestions.find((e) => e._id == answer.questionId)
            if (question?.answer === answer.selection) score++;
        })

        saveScore(eq.user._id, req.body.examId, score);

        return res.status(200).json({
            message: 'Submit successful',
            data: {
                examId: findQuestions[0].exam,
                score: score,
                totalQuestion: findQuestions.length
            }
        })
    } catch (e) {
        return res.status(500).json(e.message)
    }
}



export const joinExam = async (req, res) => {
    try {
        const findExam = await examModel.findById(req.params.id);
        if (findExam.password != req.body.password) {
            return res.status(403).json({
                message: 'Password does not match!',
                status: 403
            })
        }

        if (findExam.isLocked) {
            return res.status(404).json({
                message: 'Exam is locked!',
                status: 404
            })
        }

        return res.status(200).json({
            message: 'Join exam successful',
            status: 200
        })
    } catch (e) {
        return res.status(500).json(e.message)
    }
}