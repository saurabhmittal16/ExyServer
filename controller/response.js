const err = require('../utils/errorGenerator');

const Survey = require('../models/survey');
const Response = require('../models/response');

exports.newResponse = async (req, res) => {
    if (!req.decoded.isUser) {
        return err(403);
    }

    const surveyID = req.params.id;
    const userID = req.body.id;
    const response = req.body.response;

    try {
        const foundSurvey = await Survey.findOne({_id: surveyID});
        if (foundSurvey) {
            try {
                const createdResponse = await Response.create({
                    survey: surveyID,
                    user: userID,
                    response
                });

                if (createdResponse) {
                    foundSurvey.responses.push(createdResponse._id);
                    foundSurvey.save();
                    return {
                        "message": "Response successfully recorded",
                        "success": true
                    }
                } else {
                    return err(500);
                }
            } catch (error) {
                console.log(error);
                return err(500);
            }
        } else {
            return err(404);
        }
    } catch (error) {
        console.log(error);
        return err(500);
    }
}