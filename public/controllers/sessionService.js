angular.module('BabyCare').factory("SessionService", function ($http) {
	
	var url = '';
	var callback = '';
	var isLoggedIn = false;

	var setLogin = function (status) {
		isLoggedIn = status;
	}

	var getLogin = function () {
		return isLoggedIn;
	}

	var set = function(newURL, newCallback) {
		url = newURL;
		callback = newCallback;
	}

	var get = function() {
		return {url : url, callback: callback};
	}

	return {
		"set"	  : set,
		"get"	  : get,
		"setLogin": setLogin,
		"getLogin": getLogin
	}
});
