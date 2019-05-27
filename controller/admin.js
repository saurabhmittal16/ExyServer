const jwt = require('jsonwebtoken');

const config = require('../config');
const Admin = require('../models/admin');
const User = require('../models/user');

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
    // To-Do: Which albums should be returned for a sub-admin
    const { id } = req.decoded;

    try {
        const foundAdmin = await Admin.findOne({_id: id}, {children: 0, password: 0});
        if (foundAdmin.parent) {
            const foundParent = await Admin.findOne({_id: foundAdmin.parent});
            foundAdmin.albums = foundParent.albums;
        }
        return foundAdmin;
    } catch (err) {
        console.log(err);
        return res.code(404);
    }
}

exports.getAdminsToFollow = async (req, res) => {
    // Get broadcasters that are not sub-admins and are not followed by the user
    const { id } = req.decoded;
    const { page } = req.query;

    const options = {
        page: parseInt(page, 10) || 1,
        limit: 1
    }
    
    try {
        const foundUser = await User.findOne({_id: id});

        if (foundUser) {
            const admins = await Admin.find({
                parent: null,
                _id: {
                    $nin: foundUser.following
                }
            }, {
                children: 0,
                password: 0,
                albums: 0,
                canApprove: 0
            })
            .skip((options.page - 1) * options.limit)
            .limit(options.limit);

            return {
                data: admins,
                page: options.page,
                last: admins.length < options.limit
            };

        } else {
            console.log('No user found');
            return res.code(404);    
        }
    } catch (err) {
        console.log(err);
        return res.code(500);
    }
}

exports.followAdmin = async (req, res) => {
    // Follow admin if not already following
    const { admin } = req.body;
    const { isUser, id } = req.decoded;

    if (!isUser) {
        return res.code(403);
    }

    try {
        const foundUser = await User.findOne({_id: id});
        if (!foundUser) {
            console.log('No user found');
            return res.code(404);
        } else {
            const foundAdmin = await Admin.findOne({_id: admin});

            // Check if admin exists, if it's a super admin and the user is not already following the admin
            if (foundAdmin && !foundAdmin.parent && !foundUser.following.includes(admin)) {
                foundUser.following.push(admin);
                await foundUser.save();
            }
            return {
                "success": true
            }
        }
    } catch (err) {
        console.log(err);
        return res.code(500);
    }
}