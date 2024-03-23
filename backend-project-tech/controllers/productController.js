const Product = require("../models/productSchema");
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

exports.CreateProduct = async (req, res) =>{
    try{
        const user =await checkAdmin(req);
        if(user==false){
            return res.status(404).json({message:"A PRODUCT CAN BE ADDED ONLY BY THE ADMIN "});
        }
        const newProduct = await Product.create({
            productName: req.body.productName,
            productPrice: req.body.productPrice,
            quantityInStock: req.body.quantityInStock,
            description: req.body.description,
            category: req.body.category,
            createdby: req.user._id,
        });
        return res.status(201).json({message:"PRODUCT ADDED SUCCESSFULLY",
    product:newProduct,});

    }catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
};
exports.updateProduct = async(req,res)=>{
    try{
    const user = await checkAdmin(req);
    if(user!=true){
        return res.status(404).json({message:"A PRODUCT CAN BE UPDATED ONLY BY THE ADMIN "});
    }
    const product = await Product.findById(req.params.productID,req.body,{new:true});
    if(!product){
        return res.status(404).json({message:"PRODUCT NOT FOUND"});
    }
    return res.status(200).json({message:"product updated successfully"});
    }catch(err){
        console.log(err);
        return res.status(500).json(err);
    }

};
exports.deleteProduct = async (req, res) => {
    try {
        const user = await checkAdmin(req);
        if (user !== true) {
            return res.status(404).json({ message: "A PRODUCT CAN BE DELETED ONLY BY THE ADMIN" });
        }

        const product = await Product.findByIdAndDelete(req.params.productID);
        if (!product) {
            return res.status(404).json({ message: "PRODUCT NOT FOUND" });
        }

        return res.status(200).json({ message: "Product deleted successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
};
exports .getAllProducts = async(req,res) => {
    try {
        const products = await Product.find();
        if(products.length <= 0) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json({ message: "products" });
        
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
};