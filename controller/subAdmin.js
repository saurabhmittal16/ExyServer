const Admin = require('../models/admin');

// Adding a new sub-admin
exports.newSubAdmin = async (req, res) => {
    const {email, name, password, mobile, image} = req.body;
    const {id, isAdmin} = req.decoded;

    if (!isAdmin) {
        return res.code(403);
    }

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
            name,
            mobile,
            image,
            parent: id
        });

        const parentAdmin = await Admin.findOne({_id: id});

        if (parentAdmin) {
            parentAdmin.children.push(createdAdmin._id);
            parentAdmin.save();
            
            return {
                "code": 1,
                "sucess": true,
                "message": "Account created",
            }
        } else {
            createdAdmin.delete();
            console.log("No Admin for this new Sub-Admin");
            return res.code(500);
        }
    } catch (err) {
        console.log(err);
        return res.code(500);
    }
}

// Get all sub-admins of an admin
exports.getAllSubAdmin = async (req, res) => {
    const {id, isAdmin} = req.decoded;

    if (!isAdmin) {
        return res.code(403);
    }

    try {
        const subAdmins = await Admin.find({parent: id}, {children: 0, parent: 0, password: 0});
        return subAdmins;
    } catch (err) {
        console.log(err);
        return res.code(500);
    }
}

// Get details of a single sub-admin
exports.getSubAdmin = async (req, res) => {
    const isAdmin = req.decoded.isAdmin;
    const loginId = req.decoded.id;
    const id = req.params.id;

    if (!isAdmin) {
        return res.code(403);
    }

    try {
        const subAdmin = await Admin.findOne({_id: id}, {children: 0, parent: 0, password: 0});
        if (subAdmin) {
            if (subAdmin.parent == loginId) {
                return subAdmin
            } else {
                return res.code(403);
            }
        } else {
            return res.code(404);
        }
    } catch (err) {
        console.log(err);
        return res.code(500);
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