const jwt = require('jsonwebtoken');

const config = require('../config');
const User = require('../models/user');

exports.login = async (req, res) => {
    const {mobile, password} = req.body;

    try {
        const foundUser = await User.findOne({mobile: mobile});

        if (foundUser) {
            const isValid = foundUser.comparePassword(password);

            if (isValid) {
                const token = jwt.sign({
                    id: foundUser._id,
                    isUser: true
                }, config.secret, {
                    expiresIn: 60 * 60 * 24 * 7
                });

                return {
                    "code": 2,
                    "message": "Login successful",
                    "token": token,
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
        return res.code(500);
    }
}

exports.signup = async (req, res) => {
    const {name, email, password, gender, age, mobile} = req.body;

    const user = await User.findOne({mobile: mobile});
    if (user) {
        return {
            "code": 3,
            "message": "Mobile already registered"
        }
    }

    try {
        const createdUser = await User.create({
            name,
            email,
            password,
            gender,
            age,
            mobile
        });

        const token = jwt.sign({
            id: createdUser._id,
            isUser: true
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
        return res.code(500);
    }
}