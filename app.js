/**
 * Created by mc185249 on 2/16/2017.
 */
let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let api = require("./API/index");
let mongoose = require("mongoose");
mongoose.Promise = Promise;

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.text());
app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(function (req, res, next) {

    next();
});

app.use("/api",api(express.Router()));

app.listen(process.env.PORT_INV,()=>{
    console.log(process.env.PORT_INV);
});

 module.exports = app;