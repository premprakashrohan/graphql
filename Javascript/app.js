var express = require('express');
var mongoose = require('mongoose');

mongoose.connect('mongodb://ted:ted@ds061797.mongolab.com:61797/theenlighteneddeveloper', 
         { useNewUrlParser: true, useUnifiedTopology: true },   (error) => {
			 
    if (error) {
        console.log(error);
    }
    else {console.log("connected to remote db.")}
});

//// ============== Mongoose Schema definition  =====================
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    first_name: String,
    last_name: String,
    email: String
});

//// =========== Mongoose Model definition  ========================
var User = mongoose.model('users', UserSchema);


///// ============ server setup  =========================
var app = express();

app.get('/', function (req, res) {
    res.send("<a href='/users'>Show all the users</a>");
});

app.get('/users', function (req, res) {
    User.find({}, function (err, docs) {
        res.json(docs);
    });
});

app.get('/users/:email', function (req, res) {
    if (req.params.email) {
        User.find({ email: req.params.email }, function (err, docs) {
            res.json(docs);
        });
    }
});



/////=============  Start the server  ====================

const port = 3000;


app.listen(port);
console.log("starting server on ", port) ;