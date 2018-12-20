const Admin = require('../models/admin');

exports.addNewAlbum = async (req, res) => {
    const { name, image } = req.body;
    const { id, isAdmin } = req.decoded;

    if (!isAdmin) {
        return res.code(403);
    }

    try {
        const foundAdmin = await Admin.findOne({_id: id});

        if (foundAdmin) {
            const newAlbum = {
                "name": name,
                "image": image
            };
            foundAdmin.albums.push(newAlbum);
            foundAdmin.save();
            return foundAdmin.albums;
        } else {
            console.log("Not a valid admin");
            return res.code(401);
        }
    } catch (err) {
        console.log(err);
        return res.code(500);
    }
}