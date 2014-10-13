var express = require('express');
var app = express();

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port      = process.env.OPENSHIFT_NODEJS_PORT || 4200;

app.use('/', express.static(__dirname + '/public'));


app.get('/', function (req, res) {
	res.sendfile("Main.html");
});

/* Get environment variables of current system */
app.get('/env', function (req, res) {
	res.send(process.env);
})


/*Start the application by listening on assigned port*/
app.listen(port, ipaddress, function () {
	console.log("T800 started...listening on port " + port);
});

