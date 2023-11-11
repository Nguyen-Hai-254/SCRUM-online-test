import express from "express";
import { createExam, getAllExamByTeacher, getExam, joinExam, lockExam, submitExam } from "../controller/examController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get('/', verifyToken, getAllExamByTeacher);
router.post('/', verifyToken, createExam);
router.get('/:id', verifyToken, getExam);
router.post('/submit', verifyToken, submitExam);
router.post('/join/:id', verifyToken, joinExam);
router.put('/lock/:examId', verifyToken, lockExam);



export default router;