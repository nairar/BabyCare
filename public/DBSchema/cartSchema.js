var mongoose = require('mongoose');

var cartSchema = mongoose.Schema({
    userId: String,
    itemId: Number,
    purchased: Boolean,
    liked: Boolean,
    later: Boolean
});


module.exports = mongoose.model('UserItem', cartSchema);
