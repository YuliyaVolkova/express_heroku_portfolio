const mongoose = require('mongoose');
const passport = require('passport');

module.exports.login = function (req, res) {
  if (req.isAuthenticated()) {
    console.log(`идентифицирован ${req.isAuthenticated()}`);
    return res.redirect('/admin');
  }
  console.log(`не идентифицирован ${req.isAuthenticated()}`)
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
      //res.json({msg: req.flash('message'), status: 'Error'});
      //return res.redirect('/login');
      return res.json({status: 'Неверный логин и пароль'});
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.redirect('/admin');
    });
  })(req, res, next);
}