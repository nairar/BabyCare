var mongoose = require('mongoose');

var productSchema = mongoose.Schema({

    item        : {
        itemId    	      		: Number,
        parentItemId	  		: Number,
        name              		: String,
        salePrice	      		: Number,
        categoryNode	  		: String,
        categoryPath    		: String,
        shortDescription 		: String,
        longDescriptionkey      : String,
        customerRating			: String,
        standardShipRate		: Number,
        modelNumber				: String,
        numReviews				: Number,
        thumbnailImage			: String
    }
});


module.exports = mongoose.model('product', productSchema);