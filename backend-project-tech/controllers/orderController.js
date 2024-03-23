const Order = require("../models/orderSchema");
const  User = require("../models/userSchema");
const Cart = require("../models/cartSchema");

exports.createOrder = async (req, res) => {
    try {
        const cart = await Cart.findOne({_id:req.body.cartId});
        if(!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }


        const CartOwner = await User.findOne({_id:req.body.userId});
        if (!CartOwner) {
            return res.status(404).json({ message: "user is not found" });
        }
        

        const newOrder = await Order.create({
           OrderOwner: user._id,
           items: Cart.products,
           status:"pending",
            orderDate: req.body["orderDate"],
            shippingAddress: req.body["shippingAddress"],
            billingAddress: req.body["billingAddress"],
            
        });
        await newOrder.save();
        cart.products=[];
        await cart.save();

        return res.status(201).json({ data: newOrder, message: "Order created successfully" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        return res.status(200).json(order);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};



exports.deleteOrder = async (req, res) => {
    try {
        
        const order = await Order.findById(req.params.orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        await order.remove();

        return res.status(200).json({ message: "Order deleted successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

