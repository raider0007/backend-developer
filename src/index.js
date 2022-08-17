const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://raider007:cw6mLq2wbB1E0xGd@cluster0.flqyjwz.mongodb.net/raider007-DB?retryWrites=true&w=majority",{
    useNewUrlParser:true
})
.then(()=> console.log("MongoDB is Now Connected!"))
.catch( err => console.log(err) )

app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
