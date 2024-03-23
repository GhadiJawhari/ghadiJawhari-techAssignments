const User = require("../models/userSchema");
const Payment = require("../models/paymentSchema");

exports.createPayment = async (req, res) => {
    try{
        const user = await User.findById(req.params.userId);
        if(!user){
            return res.status(404).json({message: "user is not found"});
        }
        const payment = await Payment.create({
            order: req.body["order"],
            paymentMethod: req.body["paymentMethod"],
            paymentDate:new Date(),
            paymentStatus: req.body["paymentStatus"],
            userId: req.body["user"],
        });
        res.status(201).json({message:"PAYMENT SUCCESSFUL"});
    }catch(err)  {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};