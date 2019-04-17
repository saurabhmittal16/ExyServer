const Admin = require('../models/admin');
const Survey = require('../models/survey');
const User = require('../models/user');

exports.newSurvey = async (req, res) => {
    const {question, image, type, start, end, options, approved, album, resultPolicy} = req.body;
    const {email, id, isAdmin} = req.decoded;

    if (req.decoded.isUser) {
        return res.code(403);
    }

    if (start.valueOf() > end.valueOf()) {
        return res.code(500);
    }

    try {
        const createdSurvey = await Survey.create({
            album,
            resultPolicy,
            question,
            image,
            type,
            start,
            end,
            options,
            createdBy: id,
            approved: approved
        });

        if (createdSurvey) {
            console.log(createdSurvey);
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

exports.getUnapprovedSurveys = async (req, res) => {
    const { email, id, isAdmin, isUser } = req.decoded;
    const { page } = req.query;

    const options = {
        page: parseInt(page, 10) || 1,
        limit: 2
    }

    if (isUser || !isAdmin) {
        return res.code(403);
    }

    try {
        const foundAdmin = await Admin.findOne({_id: id});
        
        if (foundAdmin) {
            // combine admin and sub-admin
            const surveyParents = await foundAdmin.children.concat(id);

            // surveys created by admin or his/her subadmins
            const unApprovedSurveys = await Survey
                .find({
                    createdBy: { $in: surveyParents },
                    approved: false,
                    published: false
                }, { responses: 0, createdBy: 0, approved: 0 })
                .skip((options.page - 1) * options.limit)
                .limit(options.limit)
                .sort({_id: 1});

            return {
                data: unApprovedSurveys,
                page: options.page,
                last: unApprovedSurveys.length < options.limit
            };
        } else {
            console.log('Admin not found');
            return res.code(404);
        }
    } catch (err) {
        console.log(err);
        return res.code(500);
    }
}

exports.getApprovedSurveys = async (req, res) => {
    const { email, id, isAdmin, isUser } = req.decoded;
    const { page } = req.query;

    const options = {
        page: parseInt(page, 10) || 1,
        limit: 2
    }

    if (isUser || !isAdmin) {
        return res.code(403);
    }

    try {
        const foundAdmin = await Admin.findOne({_id: id});
        
        if (foundAdmin) {
            // combine admin and sub-admin
            const surveyParents = await foundAdmin.children.concat(id);

            // surveys created by admin or his/her subadmins
            const approvedSurveys = await Survey
                .find({
                    createdBy: { $in: surveyParents },
                    approved: true,
                    published: false
                }, { responses: 0, createdBy: 0, approved: 0 })
                .skip((options.page - 1) * options.limit)
                .limit(options.limit)
                .sort({_id: -1});

            return {
                data: approvedSurveys,
                page: options.page,
                last: approvedSurveys.length < options.limit
            };
        } else {
            console.log('Admin not found');
            return res.code(404);
        }
    } catch (err) {
        console.log(err);
        return res.code(500);
    }
}

exports.getSurveyDetails = async (req, res) => {
    const id = req.params.id;

    try {
        const survey = await Survey.findOne({
            _id: id,
            published: true,
            discarded: false
        }, {
            responses: 0, 
            createdBy: 0
        });

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

exports.getLiveSurveys = async (req, res) => {
    const {isUser, id} = req.decoded;

    if (!isUser) {
        return res.code(403);
    }

    // To-Do: Return surveys by following broadcasters
    try {
        const now = new Date();
        const surveys = await Survey.find({
            start: { $lt: now },
            end: { $gt: now },
            published: true,
            discarded: false
        }, {
            createdBy: 0,
            album: 0,
            responses: 0,
            approved: 0,
            published: 0
        });
    } catch(err) {
        console.log(err);
        return res.code(500);
    }

    return surveys;
}

exports.getSurveyDetailsUser = async (req, res) => {
    const surveyID = req.params.id;
    const { isUser, id } = req.decoded;

    if (!isUser) {
        return res.code(403);
    }

    try {
        const foundUser = await User.findOne({
            _id: id
        }).populate({
            path: 'responses',
            match: { survey: surveyID },
            select: 'response'
        });

        const survey = await Survey.findOne({
            _id: surveyID,
            published: true,
            discarded: false,
        }, {
            createdBy: 0,
            approved: 0,
            published: 0,
            discarded: 0,
            responses: 0,
            album: 0
        });

        // first query populates user responses and matches responses with given survey ID

        if (survey && foundUser) {
            // if the user has response for the given survey, return response info else return hasResponded false
            return {
                ...survey._doc,
                hasResponded: foundUser.responses.length === 0 ? false : true,
                response: foundUser.responses[0]
            }
        } else {
            console.log('Either survey or user not found');
            return res.code(404);
        }
    } catch (error) {
        console.log(error);
        return res.code(500);
    }
}