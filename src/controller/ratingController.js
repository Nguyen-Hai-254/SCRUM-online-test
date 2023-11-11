import RatingModel from "../database/model/ratingModel.js"

export const getExamScoreList = async (req, res) => {
    try {
        if (!req.body.examID) {
            return res.status(500).json({
                message: 'Missing input parameter!'
            })
        }
        
        const result = await RatingModel.find({
            examIDid: req.body.examID
        })

        return res.status(200).json({
            scoreList : result,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json(error.message);
    }
}

export const saveScore = async (studentID, examID, correctAns) => {
    try {
        RatingModel.insertMany([{
            examID: examID,
            studentID: studentID,
            correctAns: correctAns,
            time: new Date().getTime()
        }])
    } catch (error) {
        console.log(error);
        return false;
    }
}