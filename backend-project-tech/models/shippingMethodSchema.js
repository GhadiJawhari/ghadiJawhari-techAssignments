const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const shippingMethodSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    estimatedDeliveryTime: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('ShippingMethod', shippingMethodSchema);


