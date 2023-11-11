import express from "express";
import { getExamScoreList, getStudentScoreList } from "../controller/ratingController.js";
import { verifyToken } from "../middleware/auth.js";

const ratingRouter = express.Router();

ratingRouter.get('/exam/:examID/', verifyToken, getExamScoreList);
ratingRouter.get('/student/:studentID/', verifyToken, getStudentScoreList);

export default ratingRouter;