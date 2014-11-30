angular.module('BabyCare').controller("CartController", ["$scope", "$http", "CartService", "LikeService", "ProductDisplayService", "$routeParams", "$location", function($scope, $http, CartService, LikeService, ProductDisplayService, $routeParams, $location) {

    // Select by category 
    $scope.renderCart = function (res) {
        
        $scope.message = res.message;
        $scope.cart = res.cart;
    }

    var id = $routeParams.itemId;
    console.log("Item received by route params:" + id);
    CartService.addToCart(id, $scope.renderCart); 

    $scope.all = function () {
        $scope.toFixed = Number.prototype.toFixed;
        $scope.product = ProductDisplayService.getProductDetailsExtended();
    }

    $scope.all();

}]);


angular.module('BabyCare').controller("LikeController", ["$scope", "$http", "CartService", "LikeService", "ProductDisplayService", "$routeParams", "$location", function($scope, $http, CartService, LikeService, ProductDisplayService, $routeParams, $location) {

    // Select by category 
    $scope.renderCart = function (res) {
        
        $scope.message = res.message;
        $scope.cart = res.cart;
    }

    var id = $routeParams.itemId;
    console.log("Item received by route params:" + id);
    LikeService.addLike(id, $scope.renderCart);

    $scope.all = function () {
        $scope.toFixed = Number.prototype.toFixed;
        $scope.product = ProductDisplayService.getProductDetailsExtended();
    }

    $scope.all();

}]);
