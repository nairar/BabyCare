var db = require('./db.js');
var Product = require('../DBSchema/productSchema.js');

var getProducts = function(req, res) {
	db.mongoose.connect(db.url, function () {
		console.log("Connected to MongoDB for products");
		
		Product.find({}, function(err, products) {
				res.products = products;
				//console.log(JSON.stringify(products));
				res.json({products: products});
				db.mongoose.disconnect();
		});
	});
}


var selectByCategoryNode = function(category_id, req, res) {
	db.mongoose.connect(db.url, function() {
		console.log("Connected to MongoDB to select products in a category");
		var obj = JSON.parse(category_id);
		console.log("Mongo: Checking categoryNode value: " + JSON.stringify(obj.categoryNode));
		Product.find({"categoryNode": {$regex: ".*"+obj.categoryNode+".*"}}, function(err, products) {
			res.products = products;
			//console.log("Mongo: Products in a category:" + products);
			res.json({products: products});
			db.mongoose.disconnect();
		});
	});
}


exports.getProducts = getProducts;
exports.selectByCategoryNode = selectByCategoryNode;