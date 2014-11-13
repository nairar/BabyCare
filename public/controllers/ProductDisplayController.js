app.controller("CategoryDisplayController", ["$scope", "$http", "ProductDisplayService", "$routeParams", function($scope, $http, ProductDisplayService, $routeParams) {


    $scope.renderCategories = function(res) {
        var temp = {};
        var tempVal = '';
        var tempScope = [];
        var categoryNode = {};
        for (var i=0; i<res.products.length; i++) {
            tempVal = res.products[i];
            categoryNode = tempVal.categoryNode.split('_');
            temp = tempVal.categoryPath.split('/');

            tempScope.push(
                {'categoryNode': categoryNode[0]+ '_' + categoryNode[1],
                 'category': temp[1]
                });
        }

        var categories = [], l = tempScope.length;

        for (var i = 0; i < l; i++) {
            var f = categories.filter(function(e, _) {
               return e.categoryNode === tempScope[i].categoryNode;
            });   
            if (!f.length) {
               categories.push({
                    categoryNode: tempScope[i].categoryNode,
                    category: tempScope[i].category
                }); 
            }
        } 

        console.log(categories);

        $scope.productCategories = categories;
        
        /*
        $scope.productCategories = tempScope.filter(function(elem, pos) {
            return tempScope.indexOf({'categoryNode': elem.categoryNode, 'category': elem.category}) == pos;
        });*/

        //console.log($scope.productCategories);
    }



    
    $scope.all = function() {
        
        ProductDisplayService.selectAll($scope.renderCategories);
    }

    $scope.all();

    
}]);

app.controller("ProductDisplayController", ["$scope", "$http", "ProductDisplayService", "$routeParams", function($scope, $http, ProductDisplayService, $routeParams) {

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