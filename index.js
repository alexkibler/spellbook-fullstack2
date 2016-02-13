var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://alex:spartan117@ds061385.mongolab.com:61385/heroku_8rqzxd8x');
app.use(express.static(__dirname + '/www'));
app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({
    extended: true
}));
// views is directory for all template files
app.set('views', __dirname + '/www');
app.engine('html', require('ejs').renderFile);

app.get('/', function (req, res)
{
    res.render('index.html');
});

var spells = require('./spell_routes.js')(app);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});









