import express from "express";
import { createExam, getAllExamByTeacher, getExam, joinExam, submitExam } from "../controller/examController.js";

const router = express.Router();

router.get('/', getAllExamByTeacher);
router.post('/', createExam);
router.get('/:id', getExam);
router.post('/submit', submitExam);
router.post('/join/:id', joinExam);



export default router;