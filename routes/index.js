var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'BTC Wallet' });
});

router.get('/login', function(req, res, next) {
	res.render('login', {title: 'Login'});
});

router.get('/wallet', function(req, res, next) {
	res.render('wallet', {title: 'Wallet'});
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

module.exports = router;
