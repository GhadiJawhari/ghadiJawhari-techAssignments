const   Discount = require("../models/discountSchema");
const Admin = require("../models/adminSchena");
exports.createCoupon = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params["AdminID"]);
        if (!admin) {
            return res.status(404).json({ message: "admin is not found" });
        }

        const addNewdiscount = await Order.findById(req.params["discountId"]);
        if (!addNewOrder) {
            return res.status(404).json({ message: "discount is not found" });
        }

        const newCoupon = await Coupon.create({
            code: req.body["code"],
            percentage: req.body["percentage"],
            expiresAt: req.body["expiresAt"],
        });

        return res.status(201).json({ data: newCoupon, message: "discount created successfully" });
    } catch (err) {
        console.error(err);
         res.status(500).json({ message: err.message });
    }
};



exports.deleteCoupon = async (req, res) => {
    try {
        const couponId = req.params.discountnId;
        const deletedCoupon = await Coupon.findByIdAndDelete(discountId);

        if (!deletedCoupon) {
            return res.status(404).json({ message: "discount not found" });
        }

        return res.status(200).json({ message: "Coupon deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};
