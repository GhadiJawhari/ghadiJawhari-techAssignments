const Coupon = require("../models/couponSchema");
const User = require("../models/userSchema");
const Admin = require("../models/adminSchema"); // Import Admin model

exports.createCoupon = async (req, res) => {
    try {
        const isAdmin = await checkAdmin(req);
        if (!isAdmin) {
            return res.status(401).json({ message: "Unauthorized: Only admins can create coupons" });
        }
        const newCoupon = await Coupon.create({
            code: req.body.code,
            status: req.body.status,
            expiresAt: req.body.expiresAt
        });

        return res.status(201).json({ data: newCoupon, message: "Coupon created successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.updateCoupon = async (req, res) => {
    try {
        const isAdmin = await checkAdmin(req);
        if (!isAdmin) {
            return res.status(401).json({ message: "Unauthorized: Only admins can update coupons" });
        }

        const coupon = await Coupon.findById(req.params.couponID);
        if (!coupon) {
            return res.status(404).json({ message: "Coupon not found" });
        }

      
        coupon.code = req.body.code;
       
        coupon.status = req.body.status;
        coupon.expiresAt = req.body.expiresAt;
        const updatedCoupon = await coupon.save();
        return res.status(200).json({ coupon: updatedCoupon });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};


exports.deleteCoupon = async (req, res) => {
    try {
        const isAdmin = await checkAdmin(req);
        if (!isAdmin) {
            return res.status(401).json({ message: "Unauthorized: Only admins can delete coupons" });
        }

        const coupon = await Coupon.findById(req.params.couponID);
        if (!coupon) {
            return res.status(404).json({ message: "Coupon not found" });
        }

        await Coupon.findByIdAndDelete(req.params.couponID);

        return res.status(200).json({ message: "Coupon deleted successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const checkAdmin = async (req) => {
    try {
        const user = await User.findOne({ _id: req.user._id });
        if (!user || user.role !== "admin") {
            return false;
        } else {
            return true;
        }
    } catch (err) {
        console.error(err);
        return false; 
    }
};

