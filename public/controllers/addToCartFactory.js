angular.module('BabyCare').factory("CartService", function ($http) {
	var userCart = undefined;

	var addToCart = function(itemId, callback) {
		if (itemId != undefined) {
			console.log("CartFactory : Item being added to cart is - " + JSON.stringify(itemId));
			$http.post('/addToCart/'+ itemId).success(callback);
		}
	}

	return {
		/*"create" : create 
		"selectOne": selectOne,*/
		"addToCart": addToCart
		/*"remove": remove,
		"update": update*/
	}
});