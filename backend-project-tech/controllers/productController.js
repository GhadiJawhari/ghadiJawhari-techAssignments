const User = require("../models/userSchema");
const Product = require("../models/productSchema");
const Cart = require("../models/cartSchema");

/*exports.addProducttoCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.body.user });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const productIndex = cart.products.findIndex(item => item.product.equals(req.params.productID));
        if (productIndex !== -1) {
            return res.status(400).json({ message: "Product is already in the cart" });
        }
        cart.products.push({ product: req.params.productID, quantity: 1 });
        await cart.save();

        return res.status(200).json({ message: "Product added to cart successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.deleteProductFromCart = async (req, res) => {
    try {
        
        const cart = await Cart.findOne({ user: req.body.user });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        const productIndex = cart.products.findIndex(item => item.product.equals(req.params.productID));
        if (productIndex === -1) {
            return res.status(404).json({ message: "Product not found in the cart" });
        }
        cart.products.splice(productIndex, 1);
        await cart.save();

        return res.status(200).json({ message: "Product removed from cart successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};*/

exports.getProductDetails = async (req, res) => {
    try {
        
        const product = await Product.findById(req.params["productId"]);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json({ data: product, message: "Product details retrieved successfully" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
};

/*exports.listProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        return res.status(200).json({ data: products, message: "All products retrieved successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
};*/
