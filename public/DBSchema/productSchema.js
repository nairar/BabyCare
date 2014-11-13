var mongoose = require('mongoose');

var productSchema = mongoose.Schema({

    item        : {
        itemId          : Number,
        parentItemId    : Number,
        name            : String,
        salePrice       : Number,
        categoryNode    : String,
        categoryPath    : String

    }
});


module.exports = mongoose.model('product', productSchema);