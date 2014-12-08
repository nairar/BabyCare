	var url = require('url');
	//First check whether user is already created in db and then log him in.
	// If session has timed out or user has not authenticated properly or user not present,
	//redirect to home page
	var prev = '';
	function isLoggedIn(req, res, next) {
		res.userInfo = {alert: "",
						user: "Login",
						isLoggedIn: false,
						url : url.parse(req.url).pathname,
						cart : [],
						cartLiked: [],
						cartPurchased: []};
		prev = '';

		console.log("Check Login: previous url: " + url.parse(req.url).pathname);
		//console.log(req.session.prev);
	    // if user is authenticated in the session, carry on 
	    console.log(req.user);
	    if (req.user) {
	    	prev = url.parse(req.url).pathname;
	    	console.log("User authentication successful");
	    	res.userInfo.alert = "User Authenticated";
	    	res.userInfo.user = req.user.local.email;
	    	res.userInfo.isLoggedIn = true;	
	    } else {
	    	prev = url.parse(req.url).pathname;
	    	console.log("User authentication failed");
	    	res.userInfo.alert = 'Please Login First';
	    	res.userInfo.user = "Login";
	    	res.userInfo.isLoggedIn = false;
	    	res.json (res.userInfo);
	    }	    
	}

	exports.isLoggedIn = isLoggedIn;
	exports.prev = prev;