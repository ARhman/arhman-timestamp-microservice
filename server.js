var express = require('express');
var moment = require('moment');

var app = express();

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html', function(err) {
    if (err) console.log(err);
  })
});

app.get('/:date', function(req, res) {
  var date = req.params.date;
  var json = {};
  
  if (/^\d+$/.test(date)) {
    if (date < 0) {
      json.unix = null;
      json.natural = null;
    }
    else {
      json.unix = date;
      json.natural = moment.unix(date).format("MMMM DD, YYYY");
    }
  } else {
    if (moment(date).isValid()) {
      json.unix = moment(date).format('X');
      json.natural = date;
    } else {
      json.unix = null;
      json.natural = null;
    }
  }
  
  res.json(json);
})

app.listen(3000);