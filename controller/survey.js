const Survey = require('../models/survey');

exports.newSurvey = async (req, res) => {
    const {question, image, type, start, end, options} = req.body;
    const {email, id, isAdmin} = req.decoded;

    if (req.isUser) {
        return res.code(403);
    }

    try {
        const createdSurvey = await Survey.create({
            question,
            image,
            type,
            start,
            end,
            options,
            createdBy: id,
            approved: isAdmin
        });

        if (createdSurvey) {
            return {
                "success": true,
                "message": "Survey added",
            };
        } else {
            console.log("Failed to add survey");
            return res.code(500);
        }

    } catch (error) {
        console.log(error);
        return res.code(500);
    }
}

exports.getSurveyDetails = async (req, res) => {
    const id = req.params.id;

    try {
        const survey = await Survey.findOne({_id: id}, {responses: 0, createdBy: 0});
        if (survey) {
            return survey;
        } else {
            console.log("No such survey found");
            return res.code(404);
        }
    } catch (error) {
        console.log(error);
        return res.code(500);
    }
}