var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

try {
var configConstants = require('./server/serverConfig.js');
} catch (ex) {
    console.log('running in prod, no configFile found')
}
mongoose.connect(process.env.MONGOLAB_URI || configConstants.mongoUri);
app.use(express.static(__dirname + '/www'));
app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// passport config
var Account = require('./server/account/account_model');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());
// views is directory for all template files
app.set('views', __dirname + '/www');
app.engine('html', require('ejs').renderFile);

app.get('/', function (req, res)
{
    res.render('index.html');
});


// app.get('/.well-known/acme-challenge/ux2YmcQOdZNu-9uCK1ME_kV4_0nOtOIUNP8373r0--c', function(req, res) {
//     res.send('ux2YmcQOdZNu-9uCK1ME_kV4_0nOtOIUNP8373r0--c.0l0A9LCqouGS0n1Ilnt9RUREWUAUB3zw6hTECtR48do');
// })
var auth = require('./server/account/account_routes.js')(app);

var spells = require('./server/spells/spell_routes.js')(app);

var spellbooks = require('./server/spellbook/spellbook_routes.js')(app);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});









