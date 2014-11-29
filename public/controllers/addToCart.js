app.controller("CartController", ["$scope", "$http", "CartService", "$routeParams", function($scope, $http, CartService, $routeParams) {

    // Select by category 
    $scope.renderCart = function (res) {
        console.log("Products in the given category are:\n");
        console.log(res.cart);
        $scope.cart = res.cart;
    }


    var id = JSON.stringify($routeParams);
    console.log("Category from route params:" + id);

    CartService.showCart(id, $scope.renderCart);

}]);