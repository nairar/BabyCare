var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var bodyParser   = require('body-parser');
var routes = require('./routes/routeToService.js');

var mongodb = require('./public/services/db.js');
var configurePassport = require('./public/auth/passport.js');
var checkLogin = require('./public/auth/checkLogin.js');

//Initialize express App
var app = express();

//Connect to DB
/*mongoose.connect(mongodb.url, function (err) {
	if (err) console.log(err);
	console.log("Connected to MongoDB");	
});*/
async function connectDB() {
    try {
        await mongoose.connect(mongodb.url, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
    }
}

connectDB();

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port      = process.env.OPENSHIFT_NODEJS_PORT || 4200;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



//Session (for passport)
app.use(session({secret: 'calculatedSurge', 
                 saveUninitialized: true,
                 resave: true}));

//Cookie parser
app.use(cookieParser());

//Body parser
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));


//Configure passport using passport.js
console.log("Passport initializing...");
configurePassport(passport);

//Initialize passport
app.use(passport.initialize());
//Persist login sessions
app.use(passport.session());




//Set up template engine
app.set('view engine', 'ejs'); // set up ejs for templating

console.log(__dirname);
app.use('/', express.static(__dirname + '/public'));
app.set('views', __dirname + '/public/views');

//Setup connect flash for use
app.use(flash());


app.use('/showCart', function (req, res, next) {
	checkLogin.isLoggedIn(req, res, next);
	next();
});

app.use('/user', function (req, res, next) {
	checkLogin.isLoggedIn(req, res, next);
	next();
});

app.use('/main', function (req, res, next) {
	console.log("Received middleware functionality");
	checkLogin.isLoggedIn(req, res, next);
	
});

routes.serveRoutes(app, passport);

/*Start the application by listening on assigned port*/
app.listen(port, ipaddress, function () {
	console.log("T800 started...listening on port " + port);
});
