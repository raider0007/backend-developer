
const jwt = require("jsonwebtoken");
const BlogsModel = require("../Models/BlogsModel");

//---------------------------------------------AUTHENTICATION------------------------------//
const authenticate = function (req, res, next) {

    try {
        let token = req.headers["x-api-key"];

        if (!token) return res.status(403).send({ status: false, msg: "token must be present" });

        let decodeToken = jwt.verify(token, "project1-secrete-key")

        if (!decodeToken) return res.status(403).send({ status: false, msg: "token is invalid" })

        let authorToModify = req.query.authorId
        let authorLoggedIn = decodeToken.authorId

        if (authorToModify != authorLoggedIn) {
            return res.status(403).send({ msg: " sorry! you are not a authorized person" })

        }

        next()
    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
};
// ===========================================authorization=========================================//

const authorized = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];
        if (!token) return res.status(403).send({ status: false, msg: "token must be present" });

        let decodeToken = jwt.verify(token, "project1-secrete-key")

        if (!decodeToken) return res.status(403).send({ status: false, msg: "token is invalid" })

        let authorLoggedIn = decodeToken.authorId

        let blogId = req.params.blogId
        let data = await BlogsModel.findById({ _id: blogId })
        if (data) {
            if (data.authorId != authorLoggedIn) {

                return res.status(403).send({ msg: " sorry! you have not allowed" })
            }
            else {
                next()
            }
        } else {
            return res.status(403).send({ status: false, msg: "blogid is invalid" })
        }
    }

    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

module.exports = {authenticate,authorized}
