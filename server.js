var port = 8080;

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var fs = require('fs');
var bodyParser = require('body-parser');

require('./models/musician');
require('./models/pixel');

app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(bodyParser.json()); // for parsing application/json
  app.use(bodyParser.urlencoded({ extended: false })); 
  app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return next();
  });
});
require('./routes')(app);

var mongoUri = 'mongodb://localhost/noderest';
mongoose.connect(mongoUri);

var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + mongoUri);
});

app.listen(port);
console.log('Listening on port '+port+'...');
