var db = require('../public/services/db.js');
var http = require('http');

var Product = require('../public/DBSchema/productSchema.js');
var terms = ['baby', 'baby food', 'toys', 'huggies', 'diapers'];

var getAllData = function(req,res)
{ 
	for(count = 0; count < terms.length; count++) {
		var term = terms[count];
		for(count1 = 0; count1 < 10; count1++) {
			start = count1 * 10 + 1;
			var query = 'http://walmartlabs.api.mashery.com/v1/search?format=json&categoryId=5427&apiKey=nf29te4xjwrkv8bub2sxqjx2&';
			query+= 'query='+term+'&'+'start='+ start;
			generateData1(query, populate);
		}			
	}
	
}

var generateData1 = function(query, callback) {
	var request;
	var str = '';
	var completed_request = 0;	
	var responses = [];
	
	http.request(query, function(res) {
		res.on('data', function (chunk) {
			str+=chunk;
		});

		res.on('end', function() {
			console.log(str);
			callback(str);

		});
	}).end();
	
}


var populate = function(str) {
	
	
		
			/*console.log(res.items);*/
		var data = JSON.parse(str);
		if (data.items != undefined) {
			for (var i=0; i<data.items.length; i++) {
				var newProduct = new Product({
					item   : {
					    itemId      	    : data.items[i].itemId,
					    parentItemId    	: data.items[i].parentItemId,
					    name            	: data.items[i].name,
					    salePrice       	: data.items[i].salePrice,
					    categoryNode    	: data.items[i].categoryNode,
					    categoryPath    	: data.items[i].categoryPath,
					    shortDescription    : data.items[i].shortDescription,
					    longDescription     : data.items[i].longDescription,
					    thumbnailImage		: data.items[i].thumbnailImage,
					    customerRating		: data.items[i].customerRating,
					    standardShipRate	: data.items[i].standardShipRate,
					    modelNumber			: data.items[i].modelNumber,
					    numReviews			: data.items[i].numReviews
					}
				});
				console.log("Connected to db for population");
				//console.log(newProduct);
				newProduct.save(function(err, data) {
					if (err) console.log(err);
					console.log("Data that was saved is : " + data);
				});
			}
		}
			console.log("Saved products to database");		

}



var getProduct = function(req, res) {
	console.log("Entered get product");
	var query = 'http://api.walmartlabs.com/v1/items/'+req.params.product_id+'?apiKey=nf29te4xjwrkv8bub2sxqjx2&format=json';
	generateData1(query, function (product) {
		console.log("Received new product :" + JSON.stringify(product));
		product = JSON.parse(product);
		console.log(product);
		res.json(product);
		/*Product.update( { "itemId": product_id }, { $set: { "largeImage": res.body.largeImage } }, { upsert: true }, function(){

		});*/
	});
}


exports.getAllData = getAllData;
exports.getProduct = getProduct;