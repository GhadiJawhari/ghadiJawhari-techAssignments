const User = require("../models/usernSchema");
const Product = require("../models/productSchema");
const Cart = require("../models/cartSchema");

exports.addItemToCart = async (req, res) => {
   

    try {
        const user = await User.findOne({_id:req.user._id});

        if (!user) {
            return res.status(404).json({  message: 'a cart should have an owner' });
        }
        const cart = await Cart.findOne({ _id:user._id });

        const product = await Product.findById({ _id:req.body.product._id });

        if (!product) {
            return res.status(404).json({ type: "Invalid", message: "Product not found" });
        }

        let productPrice=product.productPrice;
        let productquantity=product.productQuantity;
        if(productquantity<=product.productQuantity) {
            return res.status(409).json({ message:"requested quantity is unavailable" });

        }
        let price=productPrice*productquantity;
        product.productquantity=product.productQuantity-productquantity;
        await product.save();
       if(!cart){
        newCart=await Cart.create({
            cartOwner: user._id,
            products:[req.body.product],
            totalPrice:price,
        });
        return res.status(200).json(newCart);
       }
       cart.products.push(req.body.product);
       cart.totalPrice=price+cart.totalPrice;
       await cart.save();
       return res.status(200).json(cart);

        
    } catch (err) {
        console.log(err);
        res.status(500).json({  message: "Internal server error" });
    }
};

exports.getCart = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const cart = await Cart.findOne({ cartOwner: user._id });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        return res.status(200).json(cart);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.deleteFromCart = async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: 'A cart should have an owner' });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ type: "Invalid", message: "Product not found" });
        }

        // Check if the product exists in the cart
        let cart = await Cart.findOne({ cartOwner: user._id });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const index = cart.products.findIndex(item => item.product === productId);

        if (index === -1) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        // Remove the product from the cart
        cart.products.splice(index, 1);

        // Adjust the total price accordingly
        cart.totalPrice -= product.productPrice * quantity;

        // Update the cart in the database
        await cart.save();

        return res.status(200).json(cart);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
