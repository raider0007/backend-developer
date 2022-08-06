const express = require('express');
const abc = require('../logger/logger')
const router = express.Router();

router.get('/test-me', function (req, res) {
    console.log(abc.welcome())
    //abc.printName()
    res.send('My second ever api!')
});
//git add .
//git commit -m "abcd".
//git checkout -b assignment/nodejs-modules
//git push https://github.com/raider0007/backend-developer.git



module.exports = router;
// adding this comment for no reason