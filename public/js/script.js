function login(){
	//Get info from forms
	var form = document.getElementById('login-form');

	var data = {
	    email: form.username.value ,
	    password: form.password.value
  	};

  	console.log(data);

	//Pass info to route and get token
	fetch('/login', {
	    method: 'POST',
	    headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
		},
	    body: JSON.stringify(data)
  	}).then(function(res) {
    	if (!res.ok) {
    		console.log('error1');
    	} 
    	else
    	{
			return res.json().then(function(result) {
				setCookie('token', result.token, 2);
				location.href("/wallet");
     		});

    	}
  	}).catch(function(err){
    	console.log("error2");
  	});
}




function register(){
	var form = document.getElementById('register-form');

	if(form.password.value == form.verify.value){
		var data = {
		    email: form.email.value,
		    password: form.password.value,
    		phone: form.phone.value,
    		first_name: form.firstname.value,
    		last_name: form.lastname.value
		};

		//CORRECT WAY OF DOING FETCH REQUEST
		fetch('/register', {
		    method: 'POST',
		    headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			},
		    body: JSON.stringify(data)
		}).then(function(res) {
		    if(!res.ok){
		    	console.log('failed to register. Error on backend');
		    }
		    else
		    {
		    	location.href = "/login";
		    }
		}).catch(function(err){
		    console.log("error2")
		});
		

	}
}

function logout(){
	//TODO: purge token from memory
	eraseCookie("token");
}

function sendTransaction(walletID, targetAddress, amount){

	var data = {
		address: targetAddress,
		amount: amount,
		currency: 'BTC'
	};

	fetch('/send/' + walletID, {
	    method: 'POST',
	    headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
		},
	    body: JSON.stringify(data)
	}).then(function(res) {
	    if(!res.ok) console.log('i hit backend');
	}).catch(function(err){
	    console.log("error2")
	});
}

function receive(){
	location.href = "/receive";
	
	var userToken = ""; //Empty string until I figure out how to store token in cookies
	
	var data = {
		token: userToken
	};

	fetch('/receive', {
	    method: 'POST',
	    body: JSON.stringify(data)
	}).then(function(res) {
	    if(!res.ok) console.log('error1');
	}).catch(function(err){
	    console.log("error2")
	});
}

function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime()+(exdays*24*60*60*1000));
    var expires = "expires="+d.toGMTString();
    document.cookie = cname+"="+cvalue+"; "+expires;
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}

function getWalletAddress(walletId){
	console.log("YOOOOO")
	fetch('/walletAddress/' + walletId, {
		method: 'POST',
		headers: {
			'Accept': 'application/json, text/plain, */*',
			'Content-Type': 'application/json',
			'x-access-token': readCookie('token')
		}
	}).then(function(res) {
		if (!res.ok) {
			console.log('did not correctly recieve wallet address given wallet id');
		}
		else
		{
			return res.json().then(function() {
				console.log("MADE IT")
				return result.address;
			});
		}
	});
}

function generateWallets() {
	fetch('/walletsBackend', {
	    method: 'GET',
	    headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json',
				'x-access-token': readCookie('token')
		}
  	}).then(function(res) {
    	if (!res.ok) {
    		console.log('error1');
    	} 
    	else
    	{
			return res.json().then(function(result) {
				var walletContainer = '<div class="wallet">'

			    for (var i = 0; i < result.wallets.length; i++){
			    	let walletAddress = getWalletAddress(result.wallets[i].id)
			        walletContainer += '<h1>' + result.wallets[i].balance + ' ' + result.wallets[i].currency +  '</h1>'
			        walletContainer += '<div class="input-row">'
			        walletContainer += '<button id="submit-button" onclick="displaySendModal(this,' + result.wallets[i].id +')"> Send </button>'
			        walletContainer += '<button id="receive-button" onclick="displayReceiveModal(this,' + walletAddress + ')"> Receive </button>'
			        walletContainer += '</div>'
			    }

			    walletContainer += '</div>'
			    document.getElementById('listOfWallets').innerHTML = walletContainer

     		});

    	}
  	});

}