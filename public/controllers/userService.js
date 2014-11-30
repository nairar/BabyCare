angular.module('BabyCare').factory("UserService", function ($http) {
	/*var create = function(employee, callback) {
		 
	} 

	var selectOne = function (empId, callback) {
		$http.get('/employees/'+empId).success(callback);
	}*/

	var getUser = function(callback) {
		$http.get('/getUser').success(callback);
	}

	var login = function (email, password, callback) {
		$http.post('/login/', {email: email, password: password}).success(callback);
	}

	return {
		/*"create" : create 
		"selectOne": selectOne,*/
		"getUser" : getUser,
		"login"	  : login
		/*"remove": remove,
		"update": update*/

	}
});
