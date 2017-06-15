/**
 * Created by AmanB on 10-05-2017.
 */
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var path = require('path');
var validator = require('validator');

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));

/*Requiring routes*/
var indexRoute = require("./routes/index.js");
var resultsRoute = require("./routes/results.js");

app.use("/", indexRoute);

app.use("/results", resultsRoute);

app.listen(process.env.PORT, process.env.IP, function () {
	console.log("Movie App is deployed on port 4000");
});
