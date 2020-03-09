const express = require('express'),
  router = express.Router(),
  bcrypt = require('bcryptjs'),
  userModel = require('../models/usermodel');


// get login page
router.get('/login', async (req, res) => {
  res.render('template', {
    locals: {
      title: 'Yellicious',
      sessionData: req.session
    },
    partials: {
      partial: 'partial-login'
    }
  });

});


// post to login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = new userModel(null, null, email, password);
  const loginResponse = await user.loginUser();

  if (!!loginResponse.isValid) {
    req.session.is_logged_in = loginResponse.isValid;
    req.session.userId = loginResponse.userId;
    req.session.name = loginResponse.name;
    res.redirect('/').redirect('/');
  } else {
    res.redirect('/login');
  }
});


// get signup page
router.get('/signup', async (req, res) => {
  res.render('template', {
    locals: {
      title: 'Read The Rainbow',
      sessionData: req.session
    },
    partials: {
      partial: 'partial-signup'
    }
  });

});


// post to signup
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const user = new userModel(null, name, email, hash);
  user.addUser();

  res.redirect('/');
});


// get logout page
router.get('/logout', async (req, res) => {
  req.session.destroy();
  res.redirect('back');
});


module.exports = router;
