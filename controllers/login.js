const mongoose = require('mongoose');
const passport = require('passport');

module.exports.login = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/admin');
  }
  res.render('my_pages/login', {
    title: 'Авторизация',
    mes: req.flash('message')
  });
}

module.exports.auth = function (req, res, next) {
  passport.authenticate('loginUsers', (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      //req.flash('message', ' укажите правильный логин и пароль!');
      return res.redirect('/login');
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.redirect('/admin');
    });
  })(req, res, next);
}