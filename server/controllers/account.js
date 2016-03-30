
var User = require('../models/user');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var configConstants = require('../serverConfig.js');

    exports.register = function(req, res) {
        // create a sample user
        var nick = new User({
            name: req.body.name,
            password: req.body.password,
            admin: req.body.admin || false
        });

        // save the sample user
        nick.save(function(err) {
            if (err) throw err;

            console.log('User saved successfully');
            res.json({ success: true });
        });
    };


    // route to return all users (GET http://localhost:8080/api/users)
    exports.getAllUsers = function(req, res) {
        User.find({}, function(err, users) {
            res.json(users);
        });
    };


    exports.login = function(req, res) {

        // find the user
        User.findOne({
            name: req.body.name
        }, function(err, user) {

            if (err) throw err;

            if (!user) {
                res.json({ success: false, message: 'Authentication failed. User not found.' });
            } else if (user) {


                // Make sure the password is correct
                user.verifyPassword(req.body.password, function(err, isMatch) {
                    if (err) { 
                        console.log(err);
                        res.json({success:false, err:err})
                    }

                    // Password did not match
                    if (!isMatch) { 
                        console.log('password did not match');
                        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
                    } else {                
                        var token = jwt.sign(user, configConstants.secret, {
                            expiresIn: 86400 // expires in 24 hours
                        });

                        res.json({
                            token: token,
                            username: user.name
                        });
                    }
                });
            }

        });
    };


    // route middleware to verify a token
    exports.isLoggedIn = function(req, res, next) {

        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        // decode token
        if (token) {

            // verifies secret and checks exp
            jwt.verify(token, configConstants.secret, function(err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });

        } else {

            // if there is no token
            // return an error
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });

        }
    };