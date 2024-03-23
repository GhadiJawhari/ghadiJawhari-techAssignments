const Admin = require("../models/adminSchema");
const Product = require("../models/productSchema");
const validator = require("validator");

exports.addNewProduct = async (req, res) => {
    try {
        const admin = await Admin.findOne({ userName: req.body.userName });
        if (!admin) {
            return res.status(403).json({ message: "Forbidden: You are not authorized to add products" });
        }

        const product = await Product.findById(req.params["productrID"]);
        if (product) {
            return res.status(401).json({ message: "Product is already added" });
        }

        const newProduct = await Product.create({
            productName: req.body["productName"],
            productPrice: req.body["productPrice"],
            quantityInStock: req.body["quantityInStock"],
            description: req.body["description"],
            category: req.body["category"],
        });

        return res.status(201).json({ data: newProduct, message: "Product added successfully" });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
};

exports.removeProduct = async (req, res) => {
    try {
        const admin = await Admin.findOne({ userName: req.body.userName });
        if (!admin) {
            return res.status(403).json({ message: "Forbidden: You are not authorized to remove products" });
        }

        const productToRemove = await Product.findById(req.params["productrID"]);
        if (!productToRemove) {
            return res.status(404).json({ message: "Product is not found" });
        }
        await productToRemove.deleteOne();
        return res.status(200).json({ message: "Product deleted successfully" });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
};

exports.deleteAdmin = async (req, res) => {
    try {
        const adminTryingToDelete = await Admin.findOne({ userName: req.body.userName });

        if (!adminTryingToDelete) {
            return res.status(404).json({ message: "Admin trying to delete admin is not found" });
        }

        await adminTryingToDelete.deleteOne();

        return res.status(200).json({ message: "Account deleted successfully" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
};

exports.adminsignUp = async (req, res) => {
    try {if(!validator.isEmail(req.body["email"])){
            return res.status(400).json({ message: "Invalid email address" });
        }

        const checkAdminExistence = await Admin.findOne({$or:[{email:req.body["email"]},{username:req.body["userName"]}],});

        if (checkAdminExistence) {
            return res.status(409).json({ message: "Admin already exists" });
        }

        if(req.body["password"]!==req.body["passwordConfirm"]){
            return res.status(400).json({messag:"Please enter matching password and password confirm"
        });
        }
        const newUser =await User.create({
            firstName: req.body["firstName"],
            lastName: req.body["lastName"],
            userName: req.body["userName"],
            email: req.body["email"],
            phoneNumber: req.body["phoneNumber"],
            gender: req.body["gender"],
            passwordConfirm:req.body["passwordConfirm"],
            passwordChangedAt:new Date(),
        });
        return res.status(201).json({message:"Signup Successfully"});
        
        
            }catch(err){
                console.log(err);
                res.status(500).json({message:err.message});
            }
        
        }
        exports.AdminLogin = async(req,res)=>{
            try{
                const {email,password}= req.body;
                const user = await Admin.findOne({email});
                if(!user||!await Admin.checkPassword(password,Admin.password)){
                    return res.status(401).json({message:"Invalid Credentials"});
        
                }
                
              return res.status(200).json({nmessage:"Logged in Successfully"});
        
            }catch(err){
                console.log(err);
                res.status(500).json({message:err.message});
        
            }
        };
        