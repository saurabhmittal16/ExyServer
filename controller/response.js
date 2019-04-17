const Survey = require('../models/survey');
const Response = require('../models/response');
const User = require('../models/user');

exports.newResponse = async (req, res) => {
    const { survey, response } = req.body;
    const { id, isUser } = req.decoded;
    console.log(req.decoded);

    if (!isUser) {
        return res.code(403);
    }

    try {
        const foundSurvey = await Survey.findOne({_id: survey});
        const foundUser = await User.findOne({
            _id: id
        }).populate({
            path: 'responses',
            match: { survey: survey },
            select: 'response'
        });

        if (foundUser & foundUser.responses.length > 0) {
            return res.code(500).send({
                "message": "You have already responded to this survey"
            });
        }

        const now = new Date();

        if (foundUser && foundSurvey && foundSurvey.published && !foundSurvey.discarded && foundSurvey.end.valueOf() > now.valueOf()) {
            try {
                const createdResponse = await Response.create({
                    survey: foundSurvey._id,
                    user: foundUser._id,
                    response
                });

                if (createdResponse) {
                    foundSurvey.responses.push(createdResponse._id);
                    foundUser.responses.push(createdResponse._id);
                    await foundSurvey.save();
                    await foundUser.save();

                    return {
                        "message": "Response successfully recorded",
                        "success": true
                    }
                } else {
                    return res.code(500);
                }
            } catch (error) {
                console.log(error);
                return res.code(500);
            }
        } else {
            return res.code(404);
        }
    } catch (error) {
        console.log(error);
        return res.code(500);
    }
}