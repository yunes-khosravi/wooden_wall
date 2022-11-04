const User = require('../models/User');
const passport = require('passport');

const register = (req, res, next) => {
  User.register({
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname
  }, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      res.redirect('http://localhost:3000/register');
    } else {
      passport.authenticate('local')(req, res, () => res.redirect('http://localhost:3000/'));
    }
  })
}

const status_cheker = (req, res, next) => {
  if (req.isAuthenticated()) return res.send({
    authstate: 'yes',
    firstname: req.user.firstname,
    lastname: req.user.lastname
  });
  else return res.status(401).send({
    authstate: 'no'
  })
}

const update_user = (req, res, next) => {
  if (req.isAuthenticated()) {
    User.updateOne({
      _id: req.body.id
    }, {
      firstname: req.body.firstname,
      lastname: req.body.lastname
    }, (err) => {
      if (err) return res.status(400).send({
        message: 'user update fail'
      })
      else return res.send({
        message: 'update user success'
      })
    })
  } else return res.status(401).send({
    message: 'athentication error'
  });
}

const delete_user = (req, res, next) => {
  if (req.isAuthenticated) {
    User.deleteOne({
      _id: req.body.id
    }, (err) => {
      if (err) return res.status(400).send(err);
      else return res.send({
        message: 'delete user success'
      })
    })
  } else {
    res.status(401).send({
      message: 'authentication error'
    })
  }
}

module.exports = {
  register,
  status_cheker,
  update_user,
  delete_user
};