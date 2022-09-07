const AuthorModel = require("../Models/AuthorModel")
const jwt = require("jsonwebtoken")

const createAuthor = async function (req, res) {
    try {
        let data = req.body;
        let { fname, lname, title, email, password } = data

        if (!fname) { return res.status(400).send({ status: false, msg: "please provide the fname" }) }
        if (!lname) { return res.status(400).send({ status: false, msg: "please provide the lname" }) }
        if (!title) { return res.status(400).send({ status: false, msg: "please provide the title" }) }


        if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/).test(email)) { return res.status(400).send({ status: false, msg: "please provide valid email" }) }

        let author = await AuthorModel.findOne({ email: email })
        if (author) { return res.status(400).send({ status: false, msg: "this email already exists please provide another email" }) }
        if (!password) { return res.status(400).send({ status: false, msg: "please provide the password" }) }
        let savedata = await AuthorModel.create(data)

        res.status(201).send({ status: true, msg: savedata })
    }
    catch (error) {

        res.status(500).send({ status: false, msg: error.message })
    }

};

//=========================================loginAuthor=================================================//


const loginAuthor = async function (req, res) {
    try {
        let authorName = req.body.emailId;
        let password = req.body.password;

        let author = await AuthorModel.findOne({ emailId: authorName, password: password });
        if (!author)
            return res.status(400).send({
                status: false,
                msg: "authorname or the password is not correct",
            });

        let token = jwt.sign(
            {
                authorId: author._id.toString(),
                group: "project1",
                organisation: "group46",
            },
            "project1-secrete-key"
        );
        res.setHeader("x-api-key", token);
        res.status(201).send({ status: true, data: token });
    }
     catch (error) {

       res.status(500).send({ status: false, msg: error.message })
     }
};


module.exports.createAuthor = createAuthor;
module.exports.loginAuthor = loginAuthor;