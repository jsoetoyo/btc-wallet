var express = require('express');
var router = express.Router();

const request = require('request');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'BTC Wallet' });
});

//Logging in
router.post('/login', function(req, res, next) {
  request.post({
    url: '/auth/token',
    body: req.body
  }).pipe(res);
});

router.get('/login', function(req, res, next) {
	res.render('login', {title: 'Login'});
});


//Getting Wallets
router.get('/wallet', function(req, res, next) {
  request.get({
    url: '/wallets',
  },
  function(error, response, body) {
    res.render('wallet', { events: JSON.parse(body) });
  });
});

router.get('/send', function(req, res, next) {
	res.render('send', {title: "Send"});
});

router.get('/receive', function(req, res, next) {
	res.render('receive', {title: "Receive"});
});

router.get('/register', function(req, res, next) {
	res.render('register', {title: "Register"});
})

//Creating a new user
router.post('/register', function(req, res, next) {
  request.post({
    url: '/users',
    body: req.body
  }).pipe(res);
  res.render('/register', {title: 'Register'});
});

module.exports = router;
