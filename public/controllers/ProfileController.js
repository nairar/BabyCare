app.controller("ProfileController", ["$scope", "$http", "ProfileService", "$routeParams", "$location", function($scope, $http, ProfileService, $routeParams, $location) {

    // Show profile data

    $scope.all = function () {
        ProfileService.getProfileData(function (res){
            console.log(res);
            $scope.likedItems = res.cartLiked;
            $scope.purchasedItems = res.cartPurchased;
            if (res.cartLiked.length == 0 && res.cartPurchased.length == 0)
                $scope.message = res.alert;
        });     
    }

    $scope.all();
}]);