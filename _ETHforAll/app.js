const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
var http = require('http');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){
    var name = req.body.name;
    // var age = req.body.age;
    // var sex = req.body.sex;
    // var cp = req.body.cp;
    // var chol = req.body.chol;

    const url = "http://127.0.0.1:3000/predict";
    http.get(url, function(response){
        console.log(response)});

    res.render('output', {patientName: name});
});

app.listen(3000, function(){
    console.log("Server running on port 3000...");
});

