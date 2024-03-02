const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reviewSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    product_ID:[ {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
],

    text: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
}, 
   {timestamps: true}
    );

module.exports = mongoose.model("Review", reviewSchema);

