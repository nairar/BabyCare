var signUp = require('./signUp.js');

var serveRoutes = function(app, passport) {


//Basic routes
/*==========================================================*/

	/* Route to the main index page */
	app.get('/', function (req, res) {
		res.sendfile("Main.html");
	});

	/* Get environment variables of current system */
	app.get('/env', function (req, res) {
		res.send(process.env);
	});


//Serving GET, POST, PUT and DELETE requests from Client
/*==========================================================*/

	//Login requests and sign-up requests
	app.get('/signup', function (req, res) {
		res.sendfile('./public/views/signUp.html');
	});

	//Lead the user to the profile page
	app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.html', {
            user : req.user // get the user out of session and pass to template
        });
    });

	//Log the user out
	app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

	
	//On sign-up form submission, send username and password to database for storage
	//so that the "new user" can try to login the next time when he tries to.
	app.post('/createUser', passport.authenticate('local-signup', {

		successRedirect: '/profile', //Go to profile page if authenticated
		failureRedirect: '/signup',
		failureFlash: true
	}));


}

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



exports.serveRoutes = serveRoutes;
