const User = require("../models/usernSchema");
const Product = require("../models/productSchema");
const Cart = require("../models/cartSchema");

exports.addItemToCart = async (req, res) => {
    const { userId, productId } = req.body;
    const quantity = Number.parseInt(req.body.quantity);

    try {
        const user = await User.findById(req.params["userID"]);

        if (!user) {
            return res.status(401).json({ success: false, message: 'Unauthorized: User not logged in' });
        }
        let cart = await Cart.findOne({ userId });

        const productDetails = await Product.findById(productId);

        if (!productDetails) {
            return res.status(404).json({ type: "Invalid", message: "Product not found" });
        }

        if (!cart) {
            cart = new Cart({
                userId,
                items: [],
                subTotal: 0
            });
        }
        const indexFound = cart.items.findIndex(item => item.productId === productId);

        if (quantity === 0 && indexFound !== -1) {
            cart.items.splice(indexFound, 1);
        } else if (indexFound !== -1) {
            cart.items[indexFound].quantity += quantity;
            cart.items[indexFound].total = cart.items[indexFound].quantity * productDetails.price;
        } else if (quantity > 0) {
            cart.items.push({
                productId,
                quantity,
                price: productDetails.price,
                total: productDetails.price * quantity
            });
        } else {
            return res.status(400).json({ Message: "Invalid request" });
        }
        cart.subTotal = cart.items.reduce((acc, item) => acc + item.total, 0);

        const updatedCart = await cart.save();

        res.status(200).json({  message: "Process Successful", data: updatedCart });
    } catch (err) {
        console.log(err);
        res.status(500).json({  message: "Internal server error" });
    }
};


exports.getCart = async (req, res) => {
    try {
        const user = await User.findById(req.params["userID"]);

        if (!user) {
            return res.status(401).json({ success: false, message: 'Unauthorized: User not logged in' });
        }
       
        const cart = await Cart.findOne({ user:req.body.user }).populate('products.product', 'name price');

        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }

        res.status(200).json({ success: true, cart });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const Cart = require('../models/cart');

exports.deleteItemFromCart = async (req, res) => {
    const { userId, productId } = req.params;

    try {
        const user = await User.findById(req.params["userID"]);

        if (!user) {
            return res.status(401).json({ success: false, message: 'Unauthorized: User not logged in' });
        }
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }

        const indexToDelete = cart.products.findIndex(item => item.product.toString() === productId);

        if (indexToDelete === -1) {
            return res.status(404).json({ success: false, message: 'Item not found in cart' });
        }
        cart.products.splice(indexToDelete, 1);
        cart.totalAmount = calculateTotalAmount(cart.products);
        await cart.save();
        return res.status(200).json({ success: true, message: 'Item deleted from cart', cart });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
function calculateTotalAmount(products) {
    return products.reduce((total, item) => total + item.product.price * item.quantity, 0);
}