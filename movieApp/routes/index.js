/**
 * Created by AmanB on 31-05-2017.
 */
var express = require("express");
var bodyParser = require("body-parser");
var path = require('path');
var request = require("request");
var validator = require('validator');
var router  = express.Router();

router.get("/", function (req, res) {
	res.render("search")
});

module.exports = router;
