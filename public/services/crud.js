var db = require('./db.js');
var checkLogin = require('../auth/checkLogin.js');

var ObjectId = require('mongoose').Types.ObjectId; 


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
	
		newCart.userId = req.user._id;
		newCart.itemId = itemId;
		newCart.later = true;
		Cart.findOne({$and:[{'itemId': itemId}, {'userId' : req.user._id}]}, function(err, cartProduct) {
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
				Cart.update({$and:[{'itemId': itemId}, {'userId' : req.user._id}]}, {$set: {'later': newCart.later}}, function (err, cartProduct) {
					if (err) console.log("Error during cart update: " + err);

					if (cartProduct) {
						console.log("Successfully updated cart for suser");
					}

					return res.end();
				});
				return res.end();
			}
			
	
		});
		
}


var like = function (itemId, req, res) {
	
		var newCart = new Cart();
	
		newCart.userId = req.user._id;
		newCart.itemId = itemId;
		newCart.liked = true;
		Cart.findOne({$and:[{'itemId': itemId}, {'userId' : req.user._id}]}, function(err, cartProduct) {
			if (err) console.log (err);
			console.log("Updated product item with Like");
			
			if (cartProduct == null) {
				console.log("Mongo: LikingOp: Saving product to cart: " + itemId);
				newCart.save(function(err){
					console.log("Like operation complete");
					if (err) {
						console.log("Error while liking:\n " + err);
					}
					return res.end();
					//res.json({message: "Added item " + itemId + " to cart"});
				});		
			}

			if (cartProduct != null) {
				Cart.update({$and:[{'itemId': itemId}, {'userId' : req.user._id}]}, {$set: {'liked': newCart.liked}}, function (err, cartProduct) {
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
exports.like = like;