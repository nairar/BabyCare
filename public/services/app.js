var app = angular.module('BabyCare',['ngRoute']);

app.factory("ProductDisplayService", function ($http) {
	/*var create = function(employee, callback) {
		 
	} 

	var selectOne = function (empId, callback) {
		$http.get('/employees/'+empId).success(callback);
	}*/

	var selectAll = function(callback) {
		$http.get('/getProducts').success(callback);
	}

	var selectByCategoryNode = function(categoryNode, callback) {
		$http.get('/getProductsByCategory/'+ categoryNode).success(callback);
	}

	/*var remove = function (id, callback) {
		$http.delete('/employees/'+id).success(callback);
	}	

	var update  = function (id, employee, callback) {
		$http.put ('/employees/'+id, employee).success(callback);
	}
*/
	return {
		/*"create" : create 
		"selectOne": selectOne,*/
		"selectAll": selectAll,
		"selectByCategoryNode": selectByCategoryNode
		/*"remove": remove,
		"update": update*/

	}
});

app.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
        when('/', {
            templateUrl: 'views/listProductsCategories.ejs',
            controller: 'CategoryDisplayController'
        }).
        when('/getProductsByCategory/:categoryNode', {
            templateUrl: 'views/listProductsInCategory.ejs',
            controller: 'ProductDisplayController'
        });
  }
]);