const mongoose = require('mongoose');
const schema = mongoose.Schema;

const productSchema = new schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: ['Equipment', 'Nutrition', 'Accessories','clothes','shoes'],
        required: true
    },
    image: {
        type: String,
        required: false
    },
    images: {
        type: [String],
        required: false,
        default: []
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
   
   
});

module.exports = mongoose.model('Product', productSchema);
