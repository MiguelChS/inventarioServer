/**
 * Created by mc185249 on 2/16/2017.
 */
let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let api = require("./API/index");
let middleware = require('./API/middleware');
let lib = require('./lib');

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.text());
app.use(express.static('public'));
//call libreria
lib();
//middleware
app.use(middleware);
//services
app.use("/api", api(express.Router()));
//html only
app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/src/public/index.html`)
})

app.listen(process.env.PORT_INV, () => {
    console.log(process.env.PORT_INV);
});

module.exports = app;