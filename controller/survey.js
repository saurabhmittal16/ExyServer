const Admin = require('../models/admin');
const Survey = require('../models/survey');

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

    if (isUser || !isAdmin) {
        return res.code(403);
    }

    try {
        const foundAdmin = await Admin.findOne({_id: id});
        // combine admin and sub-admin
        const surveyParents = await foundAdmin.children.concat(id);

        // surveys created by admin or his/her subadmins
        const unapprovedSurveys = await Survey.find({
            createdBy: { $in: surveyParents },
            approved: false,
        }, { responses: 0, createdBy: 0, approved: 0 });

        return unapprovedSurveys;
    } catch (err) {
        console.log(error);
        return res.code(500);
    }
}

exports.getApprovedSurveys = async (req, res) => {
    const { email, id, isAdmin, isUser } = req.decoded;

    if (isUser || !isAdmin) {
        return res.code(403);
    }

    try {
        const foundAdmin = await Admin.findOne({_id: id});
        // combine admin and sub-admin
        const surveyParents = await foundAdmin.children.concat(id);

        // surveys created by admin or his/her subadmins
        const approvedSurveys = await Survey.find({
            createdBy: { $in: surveyParents },
            approved: true,
        }, { responses: 0, createdBy: 0, approved: 0 });

        return approvedSurveys;
    } catch (err) {
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