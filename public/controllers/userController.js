app.controller("UserController", ["$scope", "$http", "UserService", "ProductDisplayService", "$routeParams", function($scope, $http, UserService, ProductDisplayService, $routeParams) {

    // Select by category 
    $scope.all = function (res) {

    	$scope.user = res.user;
    	//console.log ($scope.user.isLoggedIn);
    }

    $scope.go = function (req, res) {
    	var email = $('input[name="email"]').val();
    	var password = $('input[name="password"]').val();
    	UserService.login(email, password, $scope.all);
        $scope.product = ProductDisplayService.getProductDetailsExtended();
        if (req.url == '/') window.history.go(1);
        if (req.url == '/getProductDetailsExtended') window.history.go(0);
        //window.history.go(-1);

    }

    UserService.getUser($scope.all);
    

}]);