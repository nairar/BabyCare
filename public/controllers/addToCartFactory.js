angular.module('BabyCare').factory("CartService", function ($http) {
	var userCart = {};

	var addToCart = function(itemId, callback) {
		if (itemId != undefined) {
			console.log("CartFactory : Item being added to cart is - " + JSON.stringify(itemId));
			$http.post('/user/addToCart/'+ itemId).success(callback);
		}
	}

	var showCart = function (callback) {
		$http.get('/showCart').success(function (res) {
			userCart = res;
			callback(res);
		});
	}

	var getCartItems = function () {
		console.log("Adding items to cartHolder..");
		return userCart;
	}

	var checkOut = function (callback) {
		console.log("CartService: Purchasing items");
		$http.post('/user/checkOut').success(callback);
	}

	return {
		"addToCart": addToCart,
		"showCart" : showCart,
		"checkOut" : checkOut
	}
});