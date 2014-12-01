angular.module('BabyCare').controller("CartController", ["$scope", "$http", "CartService", "SessionService", "LikeService", "ProductDisplayService", "$routeParams", "$location", function($scope, $http, CartService, SessionService, LikeService, ProductDisplayService, $routeParams, $location) {

    // Select by category 
    $scope.renderCart = function (res) {
        console.log(res);
        $scope.message = res.alert;
    }

    var id = $routeParams.itemId;
    console.log("Item received by route params:" + id);
    
    if (!SessionService.getLogin()) {
        SessionService.set('/user/addToCart/' + id, $scope.renderCart);
    }
    CartService.addToCart(id, $scope.renderCart);

    $scope.all = function () {
        $scope.toFixed = Number.prototype.toFixed;
        $scope.product = ProductDisplayService.getProductDetailsExtended();
    }

    $scope.all();

}]);


angular.module('BabyCare').controller("LikeController", ["$scope", "$http", "CartService", "SessionService", "LikeService", "ProductDisplayService", "$routeParams", "$location", function($scope, $http, CartService, SessionService, LikeService, ProductDisplayService, $routeParams, $location) {

    
    $scope.renderCart = function (res) {    
        $scope.message = res.alert;
    }

    var id = $routeParams.itemId;
    if (!SessionService.getLogin()) {
        SessionService.set('/user/likeProduct/' + id, $scope.renderCart);    
    }
    LikeService.addLike(id, $scope.renderCart);    
    
    $scope.all = function () {
        $scope.toFixed = Number.prototype.toFixed;
        $scope.product = ProductDisplayService.getProductDetailsExtended();
    }

    $scope.all();

}]);
