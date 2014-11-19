var db = require('./db.js');
var Product = require('../DBSchema/productSchema.js');

var getProducts = function(req, res) {
	
		console.log("Connected to MongoDB for products");
		
		Product.find({}, function(err, products) {
				res.products = products;
				//console.log(JSON.stringify(products));
				res.json({products: products});
		});
	
}


var selectByCategoryNode = function(category_id, req, res) {
	
		console.log("Connected to MongoDB to select products in a category");
		var obj = JSON.parse(category_id);
		console.log("Mongo: Checking categoryNode value: " + JSON.stringify(obj.categoryNode));
		Product.find({"item.categoryNode": {$regex: ".*"+obj.categoryNode+".*"}}, function(err, products) {
			console.log("Mongo: Products for given category were found to be : " + products);
			res.products = products;
			//console.log("Mongo: Products in a category:" + products);
			res.json({products: products});
	
		});
	
}


exports.getProducts = getProducts;
exports.selectByCategoryNode = selectByCategoryNode;