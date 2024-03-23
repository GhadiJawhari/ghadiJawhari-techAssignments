const   Discount = require("../models/discountSchema");
const User = require("../models/userSchema"); 
const checkAdmin =async (req) =>{
    try{
        const user = await User.findByOne({_id:req.user._id});
        if (!user|| user.role!=="admin"){
            return false;
        }
        else {
            return true;
        }

    }catch(err){
        console.log(err);
    
}
};

exports.createDiscount = async (req, res) => {
    try {
       
        const isAdmin = await checkAdmin(req);
        if (!isAdmin) {
            return res.status(401).json({ message: "Unauthorized: Only admin can create a discount" });
        }

        const existingDiscount = await Discount.findOne({ code: req.body.code });
        if (existingDiscount) {
            return res.status(409).json({ message: "Discount code already exists" });
        }

        const newDiscount = await Discount.create({
            code: req.body.code,
            expiresAt: req.body.expiresAt,
        });

        return res.status(201).json({ data: newDiscount, message: "Discount created successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.deleteDiscount = async (req, res) => {
    try {
        const isAdmin = await checkAdmin(req);
        if (!isAdmin) {
            return res.status(401).json({ message: "Unauthorized: Only admin can delete a discount" });
        }
        const discount = await Discount.findById(req.params.DiscountID);
        if (!discount) {
            return res.status(404).json({ message: "Discount not found" });
        }
        await Discount.findByIdAndDelete(req.params.DiscountID);

        return res.status(200).json({ message: "Discount deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.updateDiscount = async (req, res) => {
    try {
        // Check if the user is an admin
        const isAdmin = await checkAdmin(req);
        if (!isAdmin) {
            return res.status(401).json({ message: "Unauthorized: Only admin can update a discount" });
        }
        
        const discount = await Discount.findById(req.params.DiscountID);
        if (!discount) {
            return res.status(404).json({ message: "Discount not found" });
        }

       
        discount.code = req.body.code;
        discount.expiresAt = req.body.expiresAt;

        
        await discount.save();

        return res.status(200).json({ data: discount, message: "Discount updated successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};