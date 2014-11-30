var db = require('./db.js');
var checkLogin = require('../auth/checkLogin.js');


var Product = require('../DBSchema/productSchema.js');
var Cart = require('../DBSchema/cartSchema.js');


var getProducts = function(req, res) {
	
		console.log("Connected to MongoDB for products");
		
		Product.find({}, function(err, products) {
				//res.products = products;
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


var addToCart = function (itemId, req, res) {
	
		var newCart = new Cart();
	
		newCart.userId = req.user;
		newCart.itemId = itemId;
		newCart.later = true;
		Cart.findOne({'itemId': itemId, 'userId._id' : req.user._id}, function(err, cartProduct) {
			if (err) console.log (err);
			console.log(cartProduct);

			if (cartProduct == null) {
				console.log("Mongo: Saving product to cart: " + itemId);
				newCart.save(function(err){
					console.log("Added itemId and User to Cart");
					if (err) {
						console.log("Error while adding to cart:\n " + err);
					}
					return res.end();
					//res.json({message: "Added item " + itemId + " to cart"});
				});		
			}

			if (cartProduct != null) {
				console.log("Product has already been added to your cart");
				return res.end();
			}
			
	
		});
		
}


var like = function (itemId, req, res) {
	
		var newCart = new Cart();
	
		newCart.userId = req.user;
		newCart.itemId = itemId;
		newCart.liked = true;
		Cart.findOne({'itemId': itemId, 'userId._id' : req.user._id}, {upsert: true}, function(err, cartProduct) {
			if (err) console.log (err);
			console.log("Updated product item with Like");
			
			if (cartProduct == null) {
				console.log("Mongo: Saving product to cart: " + itemId);
				newCart.save(function(err){
					console.log("Added itemId and User to Cart");
					if (err) {
						console.log("Error while adding to cart:\n " + err);
					}
					return res.end();
					//res.json({message: "Added item " + itemId + " to cart"});
				});		
			}

			if (cartProduct != null && cartProduct.liked == false) {
				Cart.update({'itemId': cartProduct.itemId, 'userId._id': req.user._id}, {'liked': newCart.liked}, function (err, cartProduct) {
					if (err) console.log("Error during like update: " + err);

					if (cartProduct) {
						console.log("Successfully updated likes for the item");
					}
					
					return res.end();
				});
			}
			
	
		});
		
}

exports.getProducts = getProducts;
exports.selectByCategoryNode = selectByCategoryNode;
exports.addToCart = addToCart;