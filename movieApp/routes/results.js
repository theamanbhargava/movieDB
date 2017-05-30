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
	// console.dir(req.query.search);
	if(validator.isEmpty(req.query.search) === false) {
		var query = req.query.search;
		var plotUrl = "http://www.omdbapi.com/?apikey=thewdb&i=";
		var url = "http://www.omdbapi.com/?s=" + query + "&apikey=" + process.env.KEY;
		request(url, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var data = JSON.parse(body);
				var serialNo = 1;
				var plot = {};
				data.Search.forEach(function (movie) {
					//initialize objetcs
					movie.plot = {};
					movie.serialNo = {};
					movie.serialNo = serialNo;
					plotUrl += movie.imdbID;
					request(plotUrl, function (error, response, moviePlot) {
						plot = JSON.parse(moviePlot);
						movie.plot = plot;
						serialNo++;
						if (serialNo === 10) {
							console.log("Data has been sent");
							res.render("results", {data: data});
						}
					});
					plotUrl = "http://www.omdbapi.com/?apikey=thewdb&i=";
				});
			}
		});
	}else{
		res.redirect("/");
	}
});

router.get("/:id", function (req, res) {
	var url = "http://www.omdbapi.com/?plot=full&i=" + req.params.id + "&apikey=" + process.env.KEY;
	request(url, function (error, response, body) {
		if(!error && response.statusCode == 200){
			var data = JSON.parse(body);
			res.render("moreInfo", {movie : data});
		}
	});
});

module.exports=router;
