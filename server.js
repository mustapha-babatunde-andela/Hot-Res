// Load Our Modules

require('dotenv').load();
var secret = require('./config/secret');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var routes = require('./app/routes');
var router = express.Router();
var path = require('path');
var app = express();

app.set('port', process.env.PORT || 8000);


mongoose.connect(secret.db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/public'));

app.use(require('prerender-node'));

app.use('/api', router);
routes(router);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});