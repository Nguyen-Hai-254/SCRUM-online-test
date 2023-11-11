import express from "express";
import { getExamScoreList } from "../controller/ratingController.js";
import { verifyToken } from "../middleware/auth.js";

const ratingRouter = express.Router();

ratingRouter.get('/:examID/result', verifyToken, getExamScoreList);
ratingRouter.get('/:studentID/result', verifyToken, getExamScoreList);

export default ratingRouter;