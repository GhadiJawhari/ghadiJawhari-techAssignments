const Coupon = require("../models/couponSchema");
const Admin = require("../models/adminSchena");
exports.createCoupon = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params["AdminID"]);
        if (!admin) {
            return res.status(404).json({ message: "admin is not found" });
        }

        const addNewCoupon = await Order.findById(req.params["couponId"]);
        if (!addNewOrder) {
            return res.status(404).json({ message: "coupon is not found" });
        }

        const newCoupon = await Coupon.create({
            code: req.body["code"],
            amount: req.body["amount"],
            expiresAt: req.body["expiresAt"],
        });

        return res.status(201).json({ data: newCoupon, message: "couppn created successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
};


exports.updateCoupon = async (req, res) => {
    try {
        const couponId = req.params.couponId;
        const { code, amount, active, expiresAt } = req.body;

        const updatedCoupon = await Coupon.findByIdAndUpdate(
            couponId,
            { code, amount, active, expiresAt },
            { new: true }
        );

        if (!updatedCoupon) {
            return res.status(404).json({ message: "Coupon not found" });
        }

        return res.status(200).json({ coupon: updatedCoupon });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.deleteCoupon = async (req, res) => {
    try {
        const couponId = req.params.couponId;
        const deletedCoupon = await Coupon.findByIdAndDelete(couponId);

        if (!deletedCoupon) {
            return res.status(404).json({ message: "Coupon not found" });
        }

        return res.status(200).json({ message: "Coupon deleted successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
