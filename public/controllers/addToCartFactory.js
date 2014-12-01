angular.module('BabyCare').factory("CartService", function ($http) {
	var userCart = undefined;

	var addToCart = function(itemId, callback) {
		if (itemId != undefined) {
			console.log("CartFactory : Item being added to cart is - " + JSON.stringify(itemId));
			$http.post('/user/addToCart/'+ itemId).success(callback);
		}
	}

	var showCart = function (callback) {
		console.log("Adding to cart..");
		$http.get('/showCart').success(callback);
	}

	return {
		"addToCart": addToCart,
		"showCart" : showCart
	}
});