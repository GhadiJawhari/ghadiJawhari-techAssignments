const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema({
    productName: {
        type: String,
        maxlength: 60,
        required: [true, "Product name is required"],
        trim: true,
        unique:true,
    },
    productPrice: {
        type: Schema.types.Decimal128,
        required: [true, "Product price is required"],
       defauly:0.00,

    },
    productQuantity: {
        type: Number,
        required: [true, "Quantity in stock is required"],
        min: 0,
        max: 1000,
    },
    quantity:{
        type:Number,
        required: true,
        min: 0,
        max: 100,

    },
    description: {
        type: String,
        minlength: 20,
        maxlength: 500,
        unique: true,
    },
    category: {
        type: String,
        required: [true, "Category is required"],
        enum: ["Lipstick", "Foundation", "Eyeshadow", "Blush", "Mascara", "Other"],
    },
    createdby:{
        type: Schema.Types.ObjectId,
        ref: "User",
   
    },
    imageURL: {
        type: String,
        default:"",    
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
