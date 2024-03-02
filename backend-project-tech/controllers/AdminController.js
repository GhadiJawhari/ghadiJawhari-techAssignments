const Admin = require("../models/adminSchema");
const Product = require("../models/productSchema");

exports.addNewProduct = async(req,res) =>{
    try{
        const admin = await Admin.findById(req.body["userName"]);
        if (!admin) {
            return res.status(403).json({ message: "Forbidden: You are not authorized to add products" });
        }
    
    const product = await Product.findById(req.params[ "productID"]);
    if (!product) {
        return res.status(401).json({ message: "product is already added" });
    }
     
     const newProduct = await User.create({
        productName: req.body["productName"],
        productPrice: req.body[" productPrice"],
        quantityInStock: req.body["quantityInStock"],
        description: req.body["description"],
        category: req.body["category"],
        
    });

    return res.status(201).json({ data: newProduct, message: "product added successfully" });

    }catch(err){
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
};
exports.removeProduct = async(req,res)=>{
    try{ 
        const admin = await Admin.findById(req.body["userName"]);
        if (!admin) {
            return res.status(403).json({ message: "Forbidden: You are not authorized to add products" });
        }
        
        const productToRemove = await User.findById(req.params["productID"]);
    if (!productToRemove) {
        return res.status(404).json({ message: "product is not being found" });
    }
   
    await product.deleteOne();
    return res.status(200).jason({message:"product deeted successfully"});

    }catch(err){
        console.error(err);
        return res.status(500).json({ message: err.message });
    }

};



exports.getProductDetails = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json({ data: product, message: "Product details retrieved successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

