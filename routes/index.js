var express = require('express');
var router = express.Router();

const config = require('../app/models/config');
const request = require('request');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'BTC Wallet' });
});

//Logging in
router.post('/login', function(req, res, next) {
  request.post({
    url: config.apiUrl + '/auth/token',
    json: req.body
  }).pipe(res);
});

router.get('/login', function(req, res, next) {
	res.render('login', {title: 'Login'});
});


//Getting Wallet page
router.get('/wallet', function(req, res, next) {
  res.render('wallet', {title: 'Wallets'});
});

//Getting Wallet id's
router.get('/walletsBackend', function(req, res, next) {
  request.get({
      url: config.apiUrl + '/wallets',
      headers: {'x-access-token': req.headers['x-access-token']}
   }).pipe(res);
})

//Getting a wallet address from its id
router.post('/walletAddress/:walletid', function(req, res, next){
  request.post({
      url: config.apiUrl + '/wallets/' + req.params.walletid + '/address',
      json: req.body
  }).pipe(res);
})

//Sending value from a wallet to another wallet
router.post('/send/:walletid', function(req, res, next) {
  request.post({
    url: config.apiUrl + '/wallet/' + req.params.walletid + '/transaction',
    json: req.body
  }).pipe(res);
});

router.get('/receive', function(req, res, next) {
	res.render('receive', {title: "Receive"});
});

router.get('/register', function(req, res, next) {
	res.render('register', {title: "Register"});
})

//Creating a new user
router.post('/register', function(req, res, next) {
  //CORRECT WAY OF DOING POSTS
  request.post({
    url: config.apiUrl + '/users',
    json: req.body
  }).pipe(res);
});

//Get Wallet address
router.post('/receive', function(req, res, next) {
  request.post({
    //Note for Akshitha: Not really sure if I can directly access object here. Probably not.
    //wallet-id is placeholder until i figure out how to access id's from specific wallets.
    url:  config.apiUrl + '/wallets/'.concat('wallet-id').concat('/address'),
    body: req.body
  }).pipe(res);
  res.render('/register', {title: 'Register'});
});

module.exports = router;
