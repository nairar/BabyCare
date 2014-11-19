var db = require('../public/services/db.js');
var http = require('http');

var Product = require('../public/DBSchema/productSchema.js');
var terms = ['baby food', 'toys', 'huggies', 'diapers', 'baby apparels', 'baby soap', 'baby shampoo', 'breast pump', 'pacifier', 'teether'];

var getAllData = function(req,res)
{ 
	for(count = 0; count < terms.length; count++) {
		var term = terms[count];
		for(count1 = 0; count1 < 10; count1++) {
			start = count1 * 10 + 1;
			var query = 'http://walmartlabs.api.mashery.com/v1/search?format=json&categoryId=5427&apiKey=nf29te4xjwrkv8bub2sxqjx2&'
			query+= 'query='+term+'&'+'start='+ start;
			generateData1(query);
			console.log(query);
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
			populate(str);

		});
	}).end();
	
}

var generateData = function() {
	var request;
	var str = '';
	var completed_request = 0;	
	var responses = [];
	
	http.get('http://walmartlabs.api.mashery.com/v1/search?format=json&categoryId=5427&apiKey=nf29te4xjwrkv8bub2sxqjx2&query=baby&start=11', function(res) {
		res.on('data', function (chunk) {
			str+=chunk;
		});

		res.on('end', function() {
			populate(str);

		});
	});
	
}


var populate = function(str) {
	
	db.mongoose.connect(db.url, function() {
		console.log("Connected to db for population");
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
				//console.log(newProduct);
				newProduct.save(function(err, data) {
					if (err) console.log(err);
					console.log("Data that was saved is : " + data);
				});
			}
		}
			console.log("Saved products to database");		
	});
}


exports.getAllData = getAllData;