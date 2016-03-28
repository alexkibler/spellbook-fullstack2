var express = require('express');
var passport = require('passport');
var Account = require('./account_model');
var router = express.Router();

module.exports = function(app) {

    app.post('/api/register', function(req, res) {
        Account.register(new Account({ username: req.body.username }), req.body.password, function(err, account) {
            if (err) {
                return res.render('register', { account: account });
            }

            passport.authenticate('local')(req, res, function() {
                res.redirect('/');
            });
        });
    });

    app.post('/api/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), function(req, res, next) {
        req.session.save(function(err) {
            if (err) {
                return next(err);
            }
            res.redirect('/');
        });
    });

    app.get('/api/logout', function(req, res, next) {
        req.logout();
        req.session.save(function(err) {
            if (err) {
                return next(err);
            }
            res.redirect('/');
        });
    });
}