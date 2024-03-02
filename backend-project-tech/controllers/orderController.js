const Order = require("../models/orderSchema");
const  User = require("../models/userSchema");

exports.createOrder = async (req, res) => {
    try {
        const addNewOrder = await Order.findById(req.body["orderName"]);
        if (!addNewOrder) {
            return res.status(404).json({ message: "Order is not found" });
        }

        const newOrder = await Order.create({
            totalAmount: req.body["totalAmount"],
            orderDate: req.body["orderDate"],
            shippingAddress: req.body["shippingAddress"],
            billingAddress: req.body["billingAddress"],
            orderStatus: req.body["orderStatus"]
        });

        return res.status(201).json({ data: newOrder, message: "Order created successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        
        const order = await Order.findById(req.params["orderID"]);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        return res.status(200).json({ data: order, message: "Order details retrieved successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
};
exports.removeOrder = async (req, res) => {
    try {
        const user = await User.findById(req.params["userID"]);
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        const order = await Order.findByIdAndDelete(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        return res.status(200).json({ data: order, message: "Order deleted successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
}

