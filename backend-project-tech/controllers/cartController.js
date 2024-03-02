const User = require("../models/usernSchema");
const Product = require("../models/productSchema");
const Cart = require("../models/cartSchema");

exports.addToCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const { productId, quantity } = req.body;

        if (!req.user) {
            return res.status(401).json({ success: false, message: 'Unauthorized: User not logged in' });
        }

      
        if (req.user.id !== userId) {
            return res.status(403).json({ success: false, message: 'Forbidden: User is not authorized to access this cart' });
        }

        let cart = await Cart.findOne({ user: userId });

      
        if (!cart) {
            cart = new Cart({ user: userId, products: [] });
        }

      
        const existingProductIndex = cart.products.findIndex(item => item.product.toString() === productId);

        if (existingProductIndex !== -1) {
            cart.products[existingProductIndex].quantity += quantity;
        } else {
           
            cart.products.push({ product: productId, quantity });
        }

        cart.totalAmount = cart.products.reduce((total, item) => total + (item.quantity * item.product.price), 0);

        await cart.save();

        res.status(200).json({ success: true, message: 'Product added to cart successfully', cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

exports.getCart = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!req.user) {
            return res.status(401).json({ success: false, message: 'Unauthorized: User not logged in' });
        }

    t
        if (req.user.id !== userId) {
            return res.status(403).json({ success: false, message: 'Forbidden: User is not authorized to access this cart' });
        }

       
        const cart = await Cart.findOne({ user: userId }).populate('products.product', 'name price');

        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }

        res.status(200).json({ success: true, cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.params;

        if (!req.user) {
            return res.status(401).json({ success: false, message: 'Unauthorized: User not logged in' });
        }

        if (req.user.id !== userId) {
            return res.status(403).json({ success: false, message: 'Forbidden: User is not authorized to access this cart' });
        }

        
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }

       
        cart.products = cart.products.filter(item => item.product.toString() !== productId);

        cart.totalAmount = cart.products.reduce((total, item) => total + (item.quantity * item.product.price), 0);

       
        await cart.save();

        res.status(200).json({ success: true, message: 'Product removed from cart successfully', cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
