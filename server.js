'use strict';

var express = require('express');
var app = express();

// Pass a string as a parameter
// Check to see whether that string contains either a unix timestamp or a natural language date (example: January 1, 2016)
// If it does, it returns both the Unix timestamp and the natural language form of that date.
// If it does not contain a date or Unix timestamp, it returns null for those properties.

Date.prototype.monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
Date.prototype.getMonthName = function() {
    return this.monthNames[this.getMonth()];
};

app.get('/*', function(req, res) {
  var date = null;
  var timestamp = {
    "unix": null,
    "natural": null
  };
  var url = req.url.substr(1);
  if(/%20/.test(url)) { // Test for natural language date input
    date = new Date(url.replace(/%20/g, " "));
  } else if (Number(url) >= 0) { // Test for unix time input
    date = new Date(Number(url)*1000);
  }
  
  if (date !== null && !isNaN(date.getDate())) {
    timestamp.unix = Math.round(Date.parse(date)/1000);
    timestamp.natural = date.getMonthName() + " " + date.getDate() + ", " + date.getFullYear();
  }
  
  res.send(JSON.stringify(timestamp));
});

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Server is listening on port ' + port + '.');
});