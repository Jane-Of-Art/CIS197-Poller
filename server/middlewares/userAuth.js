/**
 * Functions for handling user authentication
 * Owns /models/user.js
 * Requires app to use cookie-session
 */

import User from '../models/user';

/*
 * uses req.body.user.username and req.body.user.password
 * sets cookies
 */

var login = function (req, res, next) {
  User.findOne ({username: username, password: password}, function(err, user) {
    if (err) {
        next(err);
    } else {
      if (user) {
        res.cookie('user', username, { maxAge: 900000 }).send('Cookie is set');
        res.cookie('pass', password, { maxAge: 900000 }).send('Cookie is set');
      }
      next();
    }
  })
};

/**
 * Registers user via the req.body.user.xxx values
 * Currently: username, password, email
 */
var registerAndLogin = function (req, res, next) {
  console.log('registering user');
  //Code for register
  if (req.body.user.username && req.body.user.password && req.body.user.email) {
    const newUser = new User(req.body.user);
    newUser.save((err, saved) => {
      if (err) {
        next(err);
      } else {
        res.cookie('user', req.body.user.username, { maxAge: 900000 }).send('Cookie is set');
        res.cookie('pass', req.body.user.password, { maxAge: 900000 }).send('Cookie is set');
        next();
      }
    });
  }
};

/*
 * Checks for valid cookies connecting to a user
 */
var isLoggedIn = function (req, res, next) {
  if (req.cookies.user !== undefined && req.cookies.pass !== undefined){
    User.findOne ({username: req.cookies.user, password: req.cookies.pass}, function(err, user) {
      if (user) {
        res.isLoggedIn = true;
        res.user = user;
      }
      else res.isLoggedIn = false;
      res.user = {};
    })
  }
  next();
};

/*
 * Remove any associated cookies so that user no longer authenticates
 */
var logout = function (req, res, next) {
    res.clearCookie('user');
    res.clearCookie('pass');
    next();
};


module.exports = {
	login, registerAndLogin, isLoggedIn, logout
}