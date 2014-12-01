angular.module('BabyCare').factory("UserService", function ($http) {
	
	var login = function (email, password, callback) {
		console.log("login for user in progress");
		$http.post('/login/', {email: email, password: password}).success(callback);
	}

	var logout = function (url, callback) {
		$http.get(url).success(callback);
	}

	return {
		"login"	  : login,
		"logout"  : logout
	}
});
