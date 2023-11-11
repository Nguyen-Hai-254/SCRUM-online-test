import RatingModel from "../database/model/ratingModel.js"

export const getExamScoreList = async (req, res) => {
    try {
        var result;
        if (!req.body.examID) {
            if (!req.body.studentID) {
                return res.status(500).json({
                    message: 'Missing input parameter!'
                })
            }
            result = await RatingModel.find({
                studentID: req.body.examID
            });
            
        } else {
            result = await RatingModel.find({
                examID: req.body.examID
            });  
        }
    
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