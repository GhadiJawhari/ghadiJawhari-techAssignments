const   Discount = require("../models/discountSchema");
const Admin = require("../models/adminSchena");
exports.createDiscount= async (req, res) => {
    try {
        const admin = await Admin.findById(req.params["AdminID"]);
        if (!admin) {
            return res.status(404).json({ message: "Unauthorized can not create a discount" });
        }

         const discount = await Discount.findById(req.params["DiscountID"]);
         if(discount){
             return res.status(404).json({ message: "discount already exists" });
         }
        const newDiscount = await Coupon.create({
            code: req.body["code"],
            expiresAt: req.body["expiresAt"],
        });

        return res.status(201).json({ data: newCoupon, message: "discount created successfully" });
    } catch (err) {
        console.log(err);
         res.status(500).json({ message: err.message });
    }
};



exports.deleteDiscount = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params["AdminID"]);
       
        if (!admin) {
            return res.status(404).json({ message: "Unauthorized can not delete a discount" });
        }
        const dicount= await Discount.findById(req.params["DiscountID"]);
        if (!dicount) {
            return res.status(404).json({ message: "discount not found" });
        }
        const deletedDiscount = await Discount.findByIdAndDelete(req.params["DiscountID"]);

        return res.status(200).json({ message: "discount  deleted successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
};
