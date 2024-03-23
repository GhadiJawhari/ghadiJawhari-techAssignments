const Coupon = require("../models/couponSchema");
const Admin = require("../models/adminSchema");

exports.createCoupon = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params["AdminID"]);
        if (!admin) {
            return res.status(404).json({ message: "unauthorized can not create a coupon" });
        }

        const newCoupon = await Coupon.create({
            code: req.body["code"],
           status:req.body["status"],
            expiresAt: req.body["expiresAt"]
        });

        return res.status(201).json({ data: newCoupon, message: "Coupon created successfully" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
};

exports.updateCoupon = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params["AdminID"]);
        if (!admin) {
            return res.status(404).json({ message: "unauthorized can not update  a coupon" });
        }
        const coupon = await Coupon.findById(req.params["couponID"]);
        if (!coupon) {
            return res.status(404).json({ message: "Coupon not found" });
        }
        const updatedCoupon = await Coupon.findByIdAndUpdate(req.params.CouponId,
            { code:req.body["code"], amount, status:req.body["staus"], expiresAt:req.body["expiresAt"] },
            { new: true }
        );

        return res.status(200).json({ coupon: updatedCoupon });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.deleteCoupon = async (req, res) => {
    try {
        
        const admin = await Admin.findById(req.params["AdminID"]);
        if (!admin) {
            return res.status(404).json({ message: "unauthorized you can not delte the coupon" });
        }
        const coupon = await Coupon.findById(req.params["couponID"]);
        if (!coupon) {
            return res.status(404).json({ message: "Coupon not found" });
        }
        const deletedCoupon = await Coupon.findByIdAndDelete(req.params.couponId);
       
        return res.status(200).json({ message: "Coupon deleted successfully" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};


