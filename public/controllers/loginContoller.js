app.controller("LoginController", ["$scope", "$http", "LoginService", "$routeParams", function($scope, $http, LoginService, $routeParams) {

    // Select by category 
    $scope.renderProductsInCategory = function (res) {
        console.log("Products in the given category are:\n");
        console.log(res.products);
        $scope.products = res.products;
    }


    var id = JSON.stringify($routeParams);
    console.log("Category from route params:" + id);

    ProductDisplayService.selectByCategoryNode(id, $scope.renderProductsInCategory);

}]);