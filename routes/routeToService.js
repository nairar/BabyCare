var crud = require('../public/services/crud.js');
var checkLogin = require('../public/auth/checkLogin.js');

//temp operation to populate db during initialization
var pop = require('./populateDB.js');
var url = require ('url');

var serveRoutes = function(app, passport) {

//Basic routes
/*==========================================================*/

	//temp operation to populate database
	app.get('/populate', pop.getAllData);


	app.get('/', function (req, res) {
		console.log("Logging to / : " + res.userInfo);
		res.render('Main.ejs', res.userInfo);
	});

	app.get('/fb', ensureAuthenticated, function (req, res) {
		var userInfo = res.userInfo;
		res.render("Main.ejs", userInfo);
	});

	/* Route to the main index page */
	app.get('/main', function (req, res) {
		console.log(res.userInfo);
		var userInfo = res.userInfo;
		res.json(userInfo);
	});

	app.get('/error', function(req, res) {
		res.render("error.ejs", {message: req.flash('loginMessage')});
	});

	/* Get environment variables of current system */
	app.get('/env', function (req, res) {
		res.send(process.env);
	});


//Serving GET, POST, PUT and DELETE requests from Client
/*==========================================================*/

	//Login requests and sign-up requests
	app.get('/signup', function (req, res) {
		res.render('signUp.ejs',{ message: req.flash('signupMessage') });
	});

	
	//On sign-up form submission, send username and password to database for storage
	//so that the "new user" can try to login the next time when he tries to.
	app.post('/createUser', passport.authenticate('local-signup', {

		successRedirect: '/', 
		failureRedirect: '/signup',
		failureFlash: true
	}));


	//Handling local authentication failure
	app.get('/handleAuthFail_Local', function (req, res) {
		console.log("Server : Authentication failed");
		res.render('Main.ejs', {message: req.flash('loginMessage')});
	});

	app.post('/login', function(req, res, next) {
	  passport.authenticate('local-login', function(err, user, info) {
	    if (err) { return next(err); }
	    if (!user) { return res.redirect('/error'); }
	    if (user) {
	    	req.logIn(user, function(err) {
	    	      if (err) { return next(err); }
	    		  res.userInfo = {alert: "Authenticated",
	    		  				user: user.local.email,
	    		  				isLoggedIn: true};
	    		  return res.json(res.userInfo);      
	    	});
	    }})(req, res, next);
	});

	//Facebook login serve request - GET
	app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
	    passport.authenticate('facebook', { failureRedirect: '/main' }),
	    function(req, res) {
	     res.redirect('/main');
    });
	//Log the user out
	app.get('/logout', function(req, res, next) {
        req.logout();
        console.log("Redirecting to main after logout");
        res.end();
    });


/*================================================Get baby products=================================================*/

	app.get('/getProducts', crud.getProducts);
	app.get('/getProductsByCategory/:categoryNode', function (req, res) {
		crud.selectByCategoryNode(req.params.categoryNode, req, res);
	});
	app.get('/getItem/:product_id', pop.getProduct);



/*================================================User cart operations==============================================*/

	app.post('/user/addToCart/:itemId', function (req, res, next) {
		crud.addToCart(req.params.itemId, req, res, next);
	});

	app.post('/user/likeProduct/:itemId', function (req, res, next) {
		crud.like(req.params.itemId, req, res, next);
	});

	app.get('/showCart', function (req, res, next) {
		crud.showCart(req, res, next);
	});

	app.post('/user/checkOut', function (req, res, next) {
		console.log("Buying stuff..");
		crud.buy(req, res, next);
	});

}

function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) { return next(); }
	res.redirect('/');
}


exports.serveRoutes = serveRoutes;
