app.controller("CategoryDisplayController", ["$scope", "$http", "ProductDisplayService", "$routeParams", "$location", function($scope, $http, ProductDisplayService, $routeParams, $location) {
    var websense_block = ['Maternity', 'Sex', 'Porn', 'Lingerie'];

    $scope.renderCategories = function(res) {
        var temp = {};
        var tempVal = '';
        var tempScope = [];
        var categoryNode = {};
        for (var i=0; i<res.products.length; i++) {
            tempVal = res.products[i];
            //console.log("Retrieved categories are : " + JSON.stringify(tempVal));
            categoryNode = tempVal.item.categoryNode.split('_');
            temp = tempVal.item.categoryPath.split('/');
            if (!websense_block.indexOf(temp[1]) > -1) {
                tempScope.push(
                {'categoryNode': categoryNode[0]+ '_' + categoryNode[1],
                 'category': temp[1]
                });    
            }
            
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


    $scope.saveSearch = function () {
        var word = $('input[name="search"]').val();
        console.log(word);
        $location.path('/search/' + word);
        ProductDisplayService.saveSearch(word);
    }
    $scope.all();

    
}]);

app.controller("ProductDisplayController", ["$scope", "$http", "ProductDisplayService", "$routeParams", "$location", function($scope, $http, ProductDisplayService, $routeParams, $location) {

    // Select by category 
    $scope.renderProductsInCategory = function (res) {
        console.log("Products in the given category are:\n");
        console.log(res.products);
        $scope.products = res.products;
    }

    var id = JSON.stringify($routeParams);
    console.log("Category from route params:" + id);

    

    $scope.displayItemDetails = function (product, view) {
        
        ProductDisplayService.saveProductDetailsExtended(product, function(req, res) {
            $location.path(view);
        });
    }

    $scope.renderSearchProducts = function (products) {
        $scope.products = products;
    }

    $scope.all = function () {
        var products = ProductDisplayService.getSearchResults(function (res) {
            console.log("Retrieved search result: " + res);
            if (res.length == 0) {
                ProductDisplayService.selectByCategoryNode(id, $scope.renderProductsInCategory);            
            } else {
                $scope.renderSearchProducts(res);
            }

        });
    }

    $scope.all();

}]);

app.controller("ItemController", ["$scope", "$http", "ProductDisplayService", "$routeParams", "$location", function($scope, $http, ProductDisplayService, $routeParams, $location) {

    $scope.all = function() {
        $scope.toFixed = Number.prototype.toFixed;
        $scope.reviews= [{'review': "Hello there!"}, {'review' : "Hey!"}];
    }
    
    $scope.product = ProductDisplayService.getProductDetailsExtended();

    $scope.all();
}]);