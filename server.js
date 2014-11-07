var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var configurePassport = require('./public/auth/passport.js');
var flash    = require('connect-flash');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var bodyParser   = require('body-parser');
var routes = require('./routes/routeToService.js');
var mongodb = require('./services/db.js');

//Initialize express App
var app = express();

//Connect to DB
mongoose.connect(mongodb.url);


//Configure passport using passport.js
configurePassport(passport);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port      = process.env.OPENSHIFT_NODEJS_PORT || 4200;

app.use('/', express.static(__dirname + '/public'));

//Cookie parser
app.use(cookieParser());

//Body parser
app.use(bodyParser());

//Session (for passport)
app.use(session({secret: 'deepsurge'}));

//Initialize passport
app.use(passport.initialize());
//Persist login sessions
app.use(passport.session());
//Setup connect flash for use
app.use(flash());

routes.serveRoutes(app, passport);

/*Start the application by listening on assigned port*/
app.listen(port, ipaddress, function () {
	console.log("T800 started...listening on port " + port);
});