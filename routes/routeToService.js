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

	/* Route to the main index page */
	app.get('/', function (req, res) {

		res.render("Main.ejs", { message: req.flash('loginMessage') });				
	});


	/* Get environment variables of current system */
	app.get('/env', function (req, res) {
		res.send(process.env);
	});

	app.get('/getUser', function (req, res) {
		if (req.user) {
			res.json ( {user : {
				email : req.user.local.email,
				isLoggedIn : true
			}});
		} else res.json ({user : 
			{email : 'Login', isLoggedIn : false}
		});
	});


//Serving GET, POST, PUT and DELETE requests from Client
/*==========================================================*/

	//Login requests and sign-up requests
	app.get('/signup', function (req, res) {
		res.render('signUp.ejs',{ message: req.flash('signupMessage') });
	});

	//Lead the user to the profile page
	app.get('/profile', checkLogin.isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

	//Log the user out
	app.get('/logout', function(req, res) {
        req.logout();
        req.user = undefined;
        res.redirect('/');
    });

	
	//On sign-up form submission, send username and password to database for storage
	//so that the "new user" can try to login the next time when he tries to.
	app.post('/createUser', passport.authenticate('local-signup', {

		successRedirect: '/getUser', 
		failureRedirect: '/getUser',
		failureFlash: true
	}));


	//Handling local authentication failure
	app.get('/handleAuthFail_Local', function (req, res) {
		console.log("Server : Authentication failed");
		res.render('Main.ejs', {message: req.flash('loginMessage')});
	});

	//Login if user is present - serve the profile page on login
	app.post('/login',
        passport.authenticate('local-login', {
            successRedirect : '/getUser',
            failureRedirect : '/getUser'
    }));


	//Facebook login serve request - GET
	app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/getUser',
            failureRedirect : '/getUser'
        }));

/*================================================Get baby products=================================================*/

	app.get('/getProducts', crud.getProducts);
	app.get('/getProductsByCategory/:categoryNode', function (req, res) {
		crud.selectByCategoryNode(req.params.categoryNode, req, res);
	});
	app.get('/getItem/:product_id', pop.getProduct);



/*================================================User cart operations==============================================*/

	app.post('/addToCart/:itemId', checkLogin.isLoggedIn, function (req, res, next) {
		crud.addToCart(req.params.itemId, req, res);
	});

	app.get('/addToCart', checkLogin.isLoggedIn, function (req, res, next) {
		res.json({message: "Login successful"});
	});



}





exports.serveRoutes = serveRoutes;
