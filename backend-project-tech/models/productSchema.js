const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema({
    productName: {
        type: String,
        maxlength: 60,
        required: [true, "Product name is required"],
        trim: true,
    },
    productPrice: {
        type: Number,
        required: [true, "Product price is required"],
        min: 0,
        max: 10000,

    },
    quantityInStock: {
        type: Number,
        required: [true, "Quantity in stock is required"],
        min: 0,
        max: 1000,
    },
    description: {
        type: String,
        required: [true, "Description for product is required"],
        minlength: 20,
        maxlength: 500,
    },
    category: {
        type: String,
        required: [true, "Category is required"],
        enum: ["Lipstick", "Foundation", "Eyeshadow", "Blush", "Mascara", "Other"],
    },
    imageURL: {
        type: String,
        //required: [true, "Image URL is required"],
        trim: true,
    },
   
    
    availableColors: [String],
    availableSizes: [String],
    ingredients: [String],
    allergens: [String],
    shippingRestrictions: [String],
}, {
    timestamps: true
});

module.exports = mongoose.model("Product", productSchema);
