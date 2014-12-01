var app = angular.module('BabyCare',['ngRoute']);


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
        }).
        when('/getProductDetailsExtended', {
            templateUrl: 'views/productExpand.ejs',
            controller: 'ItemController'
        }).
        when('/user/addToCart/:itemId', {
            templateUrl: 'views/productExpand.ejs',
            controller: 'CartController'
        }).
        when('/showCart', {
            templateUrl: 'views/cart.ejs',
            controller: 'UserController'
        }).
        when('/user/likeProduct/:itemId', {
            templateUrl: 'views/productExpand.ejs',
            controller: 'LikeController'
        }).
        when('/logout', {
            templateUrl: 'views/listProductsCategories.ejs',
            controller: 'CategoryDisplayController'
        });
  }
]);
