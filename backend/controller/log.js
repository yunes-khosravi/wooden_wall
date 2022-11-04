const User = require('../models/User');
const passport = require('passport');

const logout = (req, res, next) => {
  req.logout();
  res.redirect('http://localhost:3000/');
}

const login = (req, res, next) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });
  req.login(user, (err) => {
    if (err) return res.send(err)
    else return passport.authenticate('local')(req, res, () => res.redirect('http://localhost:3000/'));
  })
}


module.exports = {
  logout,
  login
}