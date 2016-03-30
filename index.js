var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var spellController = require('./server/controllers/spell');
var spellbookController = require('./server/controllers/spellbook');
var accountController = require('./server/controllers/account');

try {
var configConstants = require('./server/serverConfig.js');
} catch (ex) {
    console.log('running in prod, no configFile found')
}
mongoose.connect(process.env.MONGOLAB_URI || configConstants.mongoUri);
app.use(express.static(__dirname + '/www'));
app.set('port', (process.env.PORT || 5000));
app.set('superSecret', configConstants.secret);


app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({
    extended: true
}));

var router = express.Router();
app.use(morgan('dev'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// views is directory for all template files
app.set('views', __dirname + '/www');
app.engine('html', require('ejs').renderFile);

app.get('/', function (req, res)
{
    res.render('index.html');
});



router.route('/spell')
    .get(spellController.getSpells)
    .post(accountController.isLoggedIn,spellController.createSpell);
    
router.route('/spell/:id')
    .get(spellController.getSpell)
    .put(accountController.isLoggedIn,spellController.updateSpell)
    .delete(accountController.isLoggedIn,spellController.deleteSpell);
    
router.route('/spellbook')
    .post(spellbookController.createSpellbook);    
    
router.route('/spellbook/:name')
    .get(spellbookController.getSpellbook);
    
router.route('/spellbook/:id')
    .put(spellbookController.addSpell);
   
router.route('/spellbook/:spellbookId/:spellId')    
    .delete(accountController.isLoggedIn, spellbookController.deleteSpell);     

// { username}
router.route('/login')
    .post(accountController.login)
    
router.route('/users')
    .get(accountController.isLoggedIn, accountController.getAllUsers)

// { username: foo, password: bar, admin: true/false (optional)}
router.route('/register')
    .post(accountController.register)

app.use('/api',router);


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});









