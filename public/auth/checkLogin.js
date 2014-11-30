	var url = require('url');
	//First check whether user is already created in db and then log him in.
	// If session has timed out or user has not authenticated properly or user not present,
	//redirect to home page
	function isLoggedIn(req, res, next) {

	    // if user is authenticated in the session, carry on 
	    if (req.isAuthenticated()) {

	    	
	    	res.message = "User Authenticated";
	    	res.end();
	    	next();
	    }

	    // if they aren't redirect them to the home page
	    console.log(url.parse(req.url).pathname.split("/")[1]);
	    
	    // set current path when trying to check whether user is logged in, so that
	    // when he finally logs in he can be redirected back to the same page if needed
	    req.session.currentPath = req.path;
	    if (url.parse(req.url).pathname.split("/")[1] == "addToCart") {
	    	
	    	res.json({message: 'Please login first'});
	    } else if (url.parse(req.url).pathname.split("/")[1] == "likeProduct") {
	    	
	    	res.json({message: 'Please login first'});
	    }
	     else res.redirect('/');
	    
	}

	function getUser (req, res, next) {
		res.redirect('/getUser', next);
	}

	exports.isLoggedIn = isLoggedIn;
	exports.getUser = getUser;