const jwt = require('jsonwebtoken');
const err = require('../utils/errorGenerator');

const Survey = require('../models/survey');
const Admin = require('../models/admin');
const config = require('../config');

exports.newSurvey = async (req, res) => {
    const {question, image, type, start, end, options} = req.body;
    const {email, id, isAdmin} = req.decoded;

    if (req.isUser) {
        return err(403);
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

        return {
            "success": true,
            "message": "Survey added",
        };

    } catch (err) {
        return err(500);
    }
}

exports.getSurvey = async (req, res) => {
    const id = req.params.id;

    try {
        const survey = await Survey.findOne({_id: id}, {responses: 0, createdBy: 0});
        return survey;
    } catch (err) {
        return err(500);
    }
}