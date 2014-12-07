angular.module('BabyCare').controller("CartController", ["$scope", "$http", "CartService", "SessionService", "LikeService", "ProductDisplayService", "$routeParams", "$location", function($scope, $http, CartService, SessionService, LikeService, ProductDisplayService, $routeParams, $location) {

    // Select by category 
    $scope.renderCart = function (res) {
        console.log(res);
        if (res.length != 0){
            $scope.cartItems = res;
            $scope.hideCart = false;
        }
        else {
            $scope.cartItems = undefined;
            $scope.cartAlert = 'Items yet to be added by you..';
            $scope.hideCart = true;
        }
        if (res.alert != 'undefined') {
            $scope.message = res.alert; 
        }
    }

    var id = $routeParams.itemId;
    console.log("Item received by route params:" + id);
    console.log("Scope cart items : " + $scope.cartItems);
    if (!SessionService.getLogin()) {
        SessionService.set('/user/addToCart/' + id, $scope.renderCart);
    }
    CartService.addToCart(id, $scope.renderCart);

    $scope.all = function () {
        $scope.toFixed = Number.prototype.toFixed;
        $scope.product = ProductDisplayService.getProductDetailsExtended();
    }
    $scope.showCart = function () {
        CartService.showCart($scope.renderCart);
    }

    $scope.expandProduct = function (cartItem, view) {
        console.log("Showing product");
        ProductDisplayService.expandCartProduct(cartItem, function(req, res) {
            $location.path(view);
        });
    }


    $scope.buy = function (view) {
        console.log("CartController: Checkout cart..");
        CartService.checkOut(function (req, res) {
           $location.path(view); 
       });
    }

    $scope.showCart();
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
