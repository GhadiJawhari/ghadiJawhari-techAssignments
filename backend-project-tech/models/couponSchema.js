const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const couponSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    active: {
        type: Boolean,
        default: true
    },
    expiresAt: {
        type: Date,
        required: true,
        
    },
}, { timestamps: true });
module.exports = mongoose.model('Coupon',couponSchema);
