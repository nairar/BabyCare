angular.module('BabyCare').factory("LikeService", function ($http) {
	var likedItems = undefined;

	var addLike = function(itemId, callback) {
		if (itemId != undefined) {
			console.log("CartFactory : Item being added to cart is - " + JSON.stringify(itemId));
			$http.post('/user/likeProduct/'+ itemId).success(callback);
		}
	}

	return {
		/*"create" : create 
		"selectOne": selectOne,*/
		"addLike": addLike
		/*"remove": remove,
		"update": update*/
	}
});