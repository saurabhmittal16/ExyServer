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
                    isAdmin: foundAdmin.parent ? false : true
                }, config.secret, {
                    expiresIn: 60 * 60 * 24 * 7
                });

                return {
                    "code": 2,
                    "success": true,
                    "message": "Login successful",
                    "token": token,
                }
            }
            return {
                "code": 4,
                "sucess": false,
                "message": "Invalid password"
            }
        } else {
            return {
                "code": 5,
                "sucess": false,
                "message": "No such user exists"
            }
        }
    } catch (err) {
        console.log(err);
        return res.code(500);
    }
}

exports.signup = async (req, res) => {
    const {email, password, name, mobile, image} = req.body;

    const admin = await Admin.findOne({email: email});
    if (admin) {
        return {
            "code": 3,
            "sucess": false,
            "message": "Email already registered"
        }
    }

    try {
        const createdAdmin = await Admin.create({
            email,
            password,
            image,
            name,
            mobile,
            canApprove: true
        });

        // const token = jwt.sign({
        //     id: createdAdmin._id,
        //     email: createdAdmin.email
        // }, config.secret, {
        //     expiresIn: 60 * 60 * 24 * 7
        // });
        
        return {
            "code": 1,
            "message": "Account created",
            "success": true,
            // "token": token
        }
    } catch (err) {
        console.log(err);
        return res.code(500);
    }
}

exports.details = async (req, res) => {
    const { id } = req.decoded;

    try {
        const foundAdmin = await Admin.findOne({_id: id}, {children: 0, password: 0});
        return foundAdmin;
    } catch (err) {
        console.log(err);
        return res.code(404);
    }
}