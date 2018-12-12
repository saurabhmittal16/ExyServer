const boom = require('boom');
const jwt = require('jsonwebtoken');

const config = require('../config');
const Admin = require('../models/admin');

exports.login = async (req, res) => {
    const {email, password} = req.body;

    try {
        const foundAdmin = await Admin.findOne({email: email});
        if (foundAdmin) {
            const isValid = foundAdmin.comparePassword(password);
    
            if (isValid) {
                const token = jwt.sign({
                    email: foundAdmin.email,
                    id: foundAdmin._id,
                }, config.secret, {
                    expiresIn: 60 * 60 * 24 * 7
                });

                return {
                    "code": 2,
                    "message": "Login successful",
                    "token": token,
                    "isAdmin": foundAdmin.parent ? false : true
                }
            }
            return {
                "code": 4,
                "message": "Invalid password"
            }
        } else {
            return {
                "code": 5,
                "message": "No such user exists"
            }
        }
    } catch (err) {
        console.log(err);
        throw boom.boomify(err)
    }
}

exports.signup = async (req, res) => {
    const {email, password, name, mobile} = req.body;
    console.log(email, password, name, mobile);

    const admin = await Admin.findOne({email: email});
    if (admin) {
        return {
            "code": 3,
            "message": "Email already registered"
        }
    }

    try {
        const createdAdmin = await Admin.create({
            email,
            password,
            name,
            mobile
        });

        const token = jwt.sign({
            id: createdAdmin._id,
            email: createdAdmin.email
        }, config.secret, {
            expiresIn: 60 * 60 * 24 * 7
        });
        
        return {
            "message": "Account created",
            "code": 1,
            "token": token
        }
    } catch (err) {
        console.log(err);
        throw boom.boomify(err);
    }
}