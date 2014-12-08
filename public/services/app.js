var app = angular.module('BabyCare',['ngRoute']);


app.service('Cart', function() {
    return {};
});

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
            controller: 'CartController'
        }).
        when('/user/likeProduct/:itemId', {
            templateUrl: 'views/productExpand.ejs',
            controller: 'LikeController'
        }).
        when('/logout', {
            templateUrl: 'views/listProductsCategories.ejs',
            controller: 'CategoryDisplayController'
        }).
        when('/user/checkOut', {
            templateUrl: 'views/cart.ejs',
            controller: 'CartController'
        }).
        when('/user/profile', {
            templateUrl: 'views/profile.ejs',
            controller: 'ProfileController'
        }).
        when('/search/:text', {
            templateUrl: 'views/listProductsInCategory.ejs',
            controller: 'ProductDisplayController'
        });

  }
]);
