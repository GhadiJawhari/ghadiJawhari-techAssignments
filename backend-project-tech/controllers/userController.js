const User = require("../models/userSchema");
const validator = require("validator");

exports.deleteUser = async (req, res) => {
    try {
        const userTryingToDelete = await User.findOne({ userName: req.body.userName });

        if (!userTryingToDelete) {
            return res.status(404).json({ message: "User trying to delete user is not found" });
        }
        await userTryingToDelete.deleteOne();

        return res.status(200).json({ message: "Account deleted successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
};

exports.signUp = async(req,res)=>{
    try{if(!validator.isEmail(req.body["email"])){
        return res.status(400).json({message:"invalid email address"});
    }
    if (!validator.isMobilePhone(req.body["phoneNumber"], "ar-LB", { strictMode: false })) {
        return res.status(400).json({ message: "Invalid phone number" });
    }
    const checkUserExistence = await User.findOne({$or:[{email:req.body["email"]},{username:req.body["userName"]}],});
if(checkUserExistence){
    return res.status(409).json({message:"user already exists"});
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
    shippingAddress: req.body["shippingAddress"],
    billingAddress: req.body["billingAddress"],
    password:req.body["password"],
    passwordConfirm:req.body["passwordConfirm"],
    passwordChangedAt:new Date(),
});
return res.status(201).json({message:"Signup Successfully"});


    }catch(err){
        console.log(err);
        res.status(500).json({message:err.message});
    }

};

exports.Login = async(req,res)=>{
    try{
        const {email,password}= req.body;
        const user = await User.findOne({email});
        if(!user||!await user.checkPassword(password,user.password)){
            return res.status(401).json({message:"Invalid Credentials"});

        }
        
      return res.status(200).json({nmessage:"Logged in Successfully"});

    }catch(err){
        console.log(err);
        res.status(500).json({message:err.message});

    }
};





