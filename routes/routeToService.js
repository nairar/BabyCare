var crud = require('../public/services/crud.js');
var checkLogin = require('../public/auth/checkLogin.js');
//temp operation to populate db during initialization
var pop = require('./populateDB.js');

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
        res.redirect('/');
    });

	
	//On sign-up form submission, send username and password to database for storage
	//so that the "new user" can try to login the next time when he tries to.
	app.post('/createUser', passport.authenticate('local-signup', {

		successRedirect: '/profile', //Go to profile page if authenticated
		failureRedirect: '/signup',
		failureFlash: true
	}));


	//Login if user is present - serve the profile page on login
	app.post('/login',
	 passport.authenticate('local-login', {
			successRedirect: '/profile',
			failureRedirect: '/',
			failureFlash: true
		}));

	//Facebook login serve request - GET
	app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));

/*================================================Get baby products=================================================*/

	app.get('/getProducts', crud.getProducts);
	app.get('/getProductsByCategory/:categoryNode', function (req, res) {
		crud.selectByCategoryNode(req.params.categoryNode, req, res);
	});
	app.get('/getItem/:product_id', pop.getProduct);

}



	/*function localLogin(req, res, passport) {
		;
	}
*/




exports.serveRoutes = serveRoutes;
