import RatingModel from "../database/model/ratingModel.js"

export const getExamScoreList = async (req, res) => {
    try {
        var result;
        if (!req.params.examID) {
            return res.status(500).json({
                message: 'Missing input parameter!'
            })
        }
        result = await RatingModel.find({
            examID: req.params.examID
        });  
        return res.status(200).json({
            scoreList : result,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json(error.message);
    }
}

export const getStudentScoreList = async (req, res) => {
    try {
        var result;
        if (!req.params.studentID) {
            return res.status(500).json({
                message: 'Missing input parameter!'
            })
        }
        result = await RatingModel.find({
            studentID: req.params.studentID
        });  
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
        await RatingModel.insertMany([{
            examID: examID,
            studentID: studentID,
            correctAns: correctAns,
            time: new Date().getTime()
        }])
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}