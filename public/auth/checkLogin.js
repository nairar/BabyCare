
	//First check whether user is already created in db and then log him in.
	// If session has timed out or user has not authenticated properly or user not present,
	//redirect to home page
	function isLoggedIn(req, res, next) {

	    // if user is authenticated in the session, carry on 
	    if (req.isAuthenticated())
	        return next();

	    // if they aren't redirect them to the home page
	    res.redirect('/');
	}

	exports.isLoggedIn = isLoggedIn;