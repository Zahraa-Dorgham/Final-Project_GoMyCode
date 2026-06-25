const mongoose = require('mongoose');
const schema = mongoose.Schema;

const orderItemSchema = new schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: false },
    name:    { type: String, required: true },
    image:   { type: String },
    price:   { type: Number, required: true },
    quantity:{ type: Number, required: true, default: 1, min: 1 }
});

const orderSchema = new schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [orderItemSchema],
    subtotal:  { type: Number, required: true },
    shipping:  { type: Number, default: 10 },
    total:     { type: Number, required: true },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'in_delivery', 'delivered'],
        default: 'pending'
    },
    address: { type: String, required: false }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
