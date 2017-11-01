
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var request = require("request");
var express = require("express");
var cheerio = require("cheerio");
var expressHbs = require("express-handlebars");

var app = express();
// Requiring our Note and Article models

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

var port = process.env.PORT || 3000;












app.get("/scrape", function(req, res) {
    // First, we grab the body of the html with request
    request('https://www.theonion.com/', function (error, response, body) {
      //console logs the headlines with Cheerio
        var $ = cheerio.load(body);
        $('.entry-title').each(function(){
            console.log('NEWS: ',$(this).text())
        })
      });
   
    // Tell the browser that we finished scraping the text
    res.send("Scrape Complete");
  });
  
  // This will get the articles we scraped from the mongoDB
  app.get("/articles", function(req, res) {
    // Grab every doc in the Articles array
    Article.find({}, function(error, doc) {
      // Log any errors
      if (error) {
        console.log(error);
      }
      // Or send the doc to the browser as a json object
      else {
        res.json(doc);
      }
    });
  });

  app.listen(port, function() {
    console.log("App running on port 3000! Go get your fake news!");
  });