app.controller("UserController", ["$scope", "$http", "UserService", "SessionService", "CartService", "ProductDisplayService", "$location", "$routeParams", function($scope, $http, UserService, SessionService, CartService, ProductDisplayService, $location, $routeParams) {

    $scope.userInfo = {alert: "", 
                    user: "Login",
                    isLoggedIn: false};


    $scope.init = function () {
        $scope.user = $scope.userInfo.user;
        $scope.isLoggedIn = $scope.userInfo.isLoggedIn;
    }

    // Select by category 
    $scope.all = function (res) {
        console.log("Login complete");
        console.log("User name is : " + JSON.stringify(res.user));
        if (res.user == undefined) {
            $scope.user = $scope.userInfo.user;
            $scope.isLoggedIn = $scope.userInfo.isLoggedIn;
            SessionService.setLogin(false);
        } else {
            SessionService.setLogin(true);
            var userInfo = res;
            console.log("User in response: " + JSON.stringify(userInfo.user));
            $scope.user = userInfo.user;
            $scope.isLoggedIn = userInfo.isLoggedIn;
            $scope.message = userInfo.alert;
            if (SessionService.get().url != 'undefined') {
                console.log ("Valid session present");
                if (SessionService.get().url.substring('/addToCart')) {
                    console.log ("Requesting previous operation");
                    $http.post(SessionService.get().url).success(SessionService.get().callback);
                }
            }
        }
    }


    $scope.go = function (req, res) {
    	var email = $('input[name="email"]').val();
    	var password = $('input[name="password"]').val();
    	UserService.login(email, password, $scope.all);
    }

    
    $scope.logout = function (view) {
        UserService.logout('/logout', function (req, res) {
            $scope.user = "Login";
            $scope.isLoggedIn = false;
            $scope.message = '';
            $location.path(view);
            SessionService.setLogin(false);

        });
    }

}]);