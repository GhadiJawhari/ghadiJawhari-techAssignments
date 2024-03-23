const User = require("../models/userSchema");
const validator = require("validator");
const { promisify } = require("util");

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

const createSendToken = (user, statusCode, res) => {
    const token = jwt.sign({ id: user._id });
       
    
    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user,
        },
    });
};

exports.signUp = async(req,res)=>{
    try{const emailcheck = await User.findOne({ email: req.body.email});
        if(emailcheck){
        return res.status(400).json({message:"the email is already in use"});
    }
    if(!validator.isEmail(req.body.email))
    {
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
    role: req.body["role"],
    passwordChangedAt:new Date(),
});
createSendToken(newUser,201,res);


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
            return res.status(404).json({message:"Invalid Credentials"});

        }
        
      createSendToken(user,200,res);
    }catch(err){
        console.log(err);
        res.status(500).json({message:err.message});

    }
};
exports.protect = async (req, res, next) => {
    try {
        // Check if token exists
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            return res.status(401).json({ message: "You are not logged in" });
        }

        let decoded;
        try {
            decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET); 
        } catch (error) {
            if (error.name === "JsonWebTokenError") { 
                return res.status(401).json({ message: "Invalid token" });
            } else if (error.name === "TokenExpiredError") {
                return res.status(401).json({ message: "Token has expired" });
            }
        }

        // Verify user
        const currentUser = await User.findById(decoded.id); 
        if (!currentUser) {
            return res.status(401).json({ message: "The token owner no longer exists" });
        }

        // Check if user changed password after receiving the token
        if (currentUser.passwordChangedAfterTokenIssued(decoded.iat)) {
            return res.status(401).json({ message: "Your password has been changed. Please log in again" });
        }

        req.user = currentUser; // Attach user object to request for further processing
        next(); // Call next middleware
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};


