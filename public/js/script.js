function login(){
	//Get info from forms
	var form = document.getElementById('login-form');

	var data = {
	    username: form.username.value ,
	    password: form.password.value
  	};

	//Pass info to route and get token
	var token;
	fetch('/login', {
	    method: 'POST',
	    body: JSON.stringify(data),
  	}).then(function(res) {
    	if (!res.ok) console.log('error1');
    	else return res.json().then(function(result) {
    		token = result.token;
    	})
  	}).catch(function(err){
    	console.log("error2")
  	});

  	//Go to /wallet now that token is stored in memory
  	
	location.href = "/wallet";
}

function register(){

	var form = document.getElementById('register-form');

	var data = {
	    email: form.email.value,
	    password: form.password.value 
	};

	fetch('/register', {
	    method: 'POST',
	    body: JSON.stringify(data),
	}).then(function(res) {
	    if(!res.ok) console.log('error1');
	}).catch(function(err){
	    console.log("error2")
	});

	location.href = "/wallet"
}

function logout(){
	//TODO: purge token from memory

	location.href = '/'
}

function send(){
	location.href = "/send";
}

function receive(){
	location.href = "/receive";
	
	var userToken = ""; //Empty string until I figure out how to store token in cookies
	
	var data = {
		token: userToken
	};

	fetch('/receive', {
	    method: 'POST';
	    body: JSON.stringify(data),
	}).then(function(res) {
	    if(!res.ok) console.log('error1');
	}).catch(function(err){
	    console.log("error2")
	});
}