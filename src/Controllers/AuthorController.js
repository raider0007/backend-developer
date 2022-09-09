const AuthorModel = require("../Models/AuthorModel")
const jwt = require("jsonwebtoken")

const createAuthor = async function (req, res) {
    try {
        let data = req.body;
        let { fname, lname, title, email, password } = data

        //------------fname&lname validation------------------------//
        // regex applicable for only alphabetical letters
         
        if (!(/^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$/).test(fname)) { return res.status(400).send({ status: false, msg: "please provide the fname" }) }
        if (!(/^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$/).test(lname)) { return res.status(400).send({ status: false, msg: "please provide the lname" }) }

        //----------title validation-------------------//
        if (!(/^Mr|Mrs|Miss+$/).test(title)) return res.status(400).send({ status: false, msg: "Please Use Valid Title." })
        //------------email validation------------------------//

        if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/).test(email)) { return res.status(400).send({ status: false, msg: "please provide valid email" }) }
        let emailVerify = await AuthorModel.findOne({ email: email })
        if (emailVerify) { return res.status(400).send({ status: false, msg: "this email already exists please provide another email" }) }
        //------------password validation------------------------//
        // regex is applicable for any characters 
        if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).test(password)) { return res.status(400).send({ status: false, msg: "please provide the password" }) }
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
        let userName = req.body.emailId;
        let password = req.body.password;

        let author = await AuthorModel.findOne({ emailId: userName, password: password });
        if (!author)
            return res.status(400).send({ status: false, msg: "username or the password is not correct" });

        //--------------------------------token creation-------------------------------------------------------//
        let payload =
        {
            authorId: author._id,
            group: "project1",
            organisation: "group46",
        }
        let token = jwt.sign(payload, "project1-secrete-key",{ expiresIn: "1d" });

        res.setHeader("x-api-key", token);
        
        res.status(201).send({ status: true, data: token });
    }
    catch (error) {

        res.status(500).send({ status: false, msg: error.message })
    }
};


module.exports= { createAuthor, loginAuthor } 
