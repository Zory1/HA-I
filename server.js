var port = 8080;

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var fs = require('fs');

require('./models/musician');

app.configure(function(){
  app.use(express.bodyParser());
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
