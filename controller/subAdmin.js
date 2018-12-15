const Admin = require('../models/admin');
const err = require('../utils/errorGenerator');

// Adding a new sub-admin
exports.newSubAdmin = async (req, res) => {
    const {email, name, password, mobile} = req.body;
    const {id} = req.decoded;

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
            mobile,
            parent: id
        });

        const parentAdmin = await Admin.findOne({_id: id});

        if (parentAdmin) {
            parentAdmin.children.push(createdAdmin._id);
            parentAdmin.save();
            
            return {
                "message": "Account created",
                "code": 1,
            }
        } else {
            createdAdmin.delete();
            console.log("No Admin for this new Sub-Admin");
            return err(500);
        }
    } catch (err) {
        console.log(err);
        throw boom.boomify(err);
    }
}

// Get all sub-admins of an admin
exports.getAllSubAdmin = async (req, res) => {
    const {id} = req.decoded;

    try {
        const subAdmins = await Admin.find({parent: id}, {children: 0, parent: 0, password: 0});
        return subAdmins;
    } catch (err) {
        console.log(err);
        throw boom.boomify(err);
    }
}

// Get details of a single sub-admin
exports.getSubAdmin = async (req, res) => {
    const loginId = req.decoded.id;
    const id = req.params.id;

    try {
        const subAdmin = await Admin.findOne({_id: id}, {children: 0, parent: 0, password: 0});
        if (subAdmin) {
            if (subAdmin.parent == loginId) {
                return subAdmin
            } else {
                return err(403);
            }
        } else {
            return err(404);
        }
    } catch (err) {
        console.log(err);
        return err(500);
    }
}

//Update details of a single sub-admin
exports.updateSubAdmin = async (req, res) => {
    // Discuss update
    return null;
}

// Delete details of a single sub-admin
exports.deleteSubAdmin = async (req, res) => {
    // Discuss delete
    return null;
}