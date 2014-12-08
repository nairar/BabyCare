angular.module('BabyCare').factory("ProductDisplayService", function ($http) {
	var currentlyDisplayedProduct = undefined;
	var searchWord = "";
	/*var create = function(employee, callback) {
		 
	} 

	var selectOne = function (empId, callback) {
		$http.get('/employees/'+empId).success(callback);
	}*/

	var selectAll = function(callback) {
		$http.get('/getProducts').success(callback);
	}

	var selectByCategoryNode = function(categoryNode, callback) {
		$http.get('/getProductsByCategory/'+ categoryNode).success(callback);
	}

	var saveSearch = function (word) {
		this.searchWord = word;
	}

	var getSearchResults = function (callback) {
		console.log("Search word retrieved is : " + this.searchWord);
		$http.get('/search/' + this.searchWord).success(callback);
	}

	var expandCartProduct = function (cartItem, callback) {
		$http.get('/getItem/'+cartItem.itemId).success(function (res) {
			currentlyDisplayedProduct = res;
			callback();
			console.log("Currently saved product: " + JSON.stringify(currentlyDisplayedProduct.itemId));
		});
	}
	/*var remove = function (id, callback) {
		$http.delete('/employees/'+id).success(callback);
	}	

	var update  = function (id, employee, callback) {
		$http.put ('/employees/'+id, employee).success(callback);
	}
*/
	var saveProductDetailsExtended = function(product, callback) {
		if (product != undefined) {
			$http.get('/getItem/'+product.item.itemId).success(function (res){
				currentlyDisplayedProduct = res;
				callback();
				console.log("Currently saved product: " + JSON.stringify(currentlyDisplayedProduct.itemId));
			});
			
		}
	}

	var getProductDetailsExtended = function() {
		return currentlyDisplayedProduct;
	}


	return {
		/*"create" : create 
		"selectOne": selectOne,*/
		"selectAll": selectAll,
		"selectByCategoryNode": selectByCategoryNode,
		"saveProductDetailsExtended": saveProductDetailsExtended,
		"getProductDetailsExtended": getProductDetailsExtended,
		"expandCartProduct" : expandCartProduct,
		"saveSearch" : saveSearch,
		"getSearchResults" : getSearchResults
		/*"remove": remove,
		"update": update*/

	}
});
