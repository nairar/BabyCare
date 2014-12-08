angular.module('BabyCare').factory("ProfileService", function ($http) {
	
	var cartItems = [];

	var getProfileData = function (callback) {
		$http.get('/user/profile').success(function (res) {

			cartItems = JSON.stringify(res.cart);
			console.log("Setting profile cart to : " + JSON.stringify(cartItems));
			callback(res);
		});
	}

	var getCartItems = function () {
		return this.cartItems;
	}

	return {
		"getProfileData" : getProfileData,
		"getCartItems" : getCartItems
	}
});
