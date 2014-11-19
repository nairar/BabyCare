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

//Initialize express App
var app = express();

//Connect to DB
mongoose.connect(mongodb.url, function (err) {
	if (err) console.log(err);
	console.log("Connected to MongoDB");	
});

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port      = process.env.OPENSHIFT_NODEJS_PORT || 4200;

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
//Setup connect flash for use

//Set up template engine
app.set('view engine', 'ejs'); // set up ejs for templating

console.log(__dirname);
app.use('/', express.static(__dirname + '/public'));
app.set('views', __dirname + '/public/views');


app.use(flash());

routes.serveRoutes(app, passport);

/*Start the application by listening on assigned port*/
app.listen(port, ipaddress, function () {
	console.log("T800 started...listening on port " + port);
});