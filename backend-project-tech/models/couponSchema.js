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
    status: {
        type: Boolean,
        required: true,
        enum:["active", "not_active"]
    },
    expiresAt: {
        type: Date,
        required: true,
        
    },
}, { timestamps: true });
module.exports = mongoose.model('Coupon',couponSchema);
