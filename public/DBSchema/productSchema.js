var mongoose = require('mongoose');

var productSchema = mongoose.Schema({

    item        : {
        itemId    	      		: Number,
        parentItemId	  		: Number,
        name              		: {type: String, index: true},
        salePrice	      		: Number,
        categoryNode	  		: String,
        categoryPath    		: String,
        shortDescription 		: {type: String, index: true},
        longDescriptionkey      : {type: String, index: true},
        customerRating			: String,
        standardShipRate		: Number,
        modelNumber				: String,
        numReviews				: Number,
        thumbnailImage			: String
    }
});

module.exports = mongoose.model('product', productSchema);