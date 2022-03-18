var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    productDescription: {
        type: String,
        default: ""
    },
    productPrice: {
        type: Number, 
        default: 0.0,
        required: true
    },
    productImage: {
        type: String,
        default: ""
    },
    sellerID: {
        type: String,
        default: ""
    },
    forSell: {
        type: Boolean,
        default: true
    },
    commentList:  {
        type: [String],
        default: []
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', ProductSchema);
