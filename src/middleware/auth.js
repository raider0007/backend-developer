
const jwt = require("jsonwebtoken");
// const AuthorModel = require("../models/AuthorModel");

const authenticate= function (req, res, next) {
   try {let token = req.headers["x-api-key"];

   
    if (!token) return res.status(403).send({ status: false, msg: "token must be present" });

        let decodeToken = jwt.verify(token, "project1-secrete-key")

        if(!decodeToken) return res.status(403).send({ status: false, msg: "token is invalid" })
    
         let authorToModify = req.query.authorId 
        let authorLoggedIn = decodeToken.authorId
        
        if (authorToModify != authorLoggedIn ) {
            return res.status(403).send({ msg: " sorry! you are not a authorized person" })
        } 
        let blogTomodify=  req.params.blogId
        // let authorLoggedIn = decodeToken.authorId
        if (blogTomodify != authorLoggedIn ) {
            return res.status(403).send({ msg: " sorry! you are not a authorized person" })
        } 
         next()
     }   
        
    
    catch(error){
        res.status(500).send({status:false, msg: error.message})
    }
}
   


module.exports.authenticate = authenticate
module.exports.authorized = authorized