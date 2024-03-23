const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const adminSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "First Name is Required"],
        trim: true,
        maxlength: 50,
        minlength: 3,
    },
    lastName: {
        type: String,
        required: [true, "Last Name is Required"],
        trim: true,
        maxlength: 50,
        minlength: 3,
    },
    userName: {
        type: String,
        unique: true,
        required: [true, "Username is required"],
        trim: true,
        maxlength: 20,
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
        trim: true,
        maxlength: 150,
        lowercase: true,
    },
    phoneNumber: {
        type: String,
        unique: true,
        required: [true, "Phone number is required"],
        trim: true,
        maxlength: 20,
        lowercase: true,
    },
    password:{
        type: String,
        required:[true,"password is required"],
        trim:true,
        minLength:8,
        trim: true,

    },
    passwordConfirm:{
       
            type: String,
            trim:true,
            minLength:8,
            trim: true,

    },
    passwordChangedAt: Date,
    gender: {
        type: String,
        required: [true, "Gender is required"],
        trim: true,
        maxlength: 7,
    },

},
{timestamps:true});
adminSchema.pre("save", async function(next){//next is a special middleware
    try{
        if (!this.isModified("password")){
            return next();
        }
        this.password = await bcrypt.hash(this.password,12);
        this .passwordChangedAt=undefined;

    }catch(err){
        console.log(err);
    }
});
adminSchema.methods.checkPassword = async function(candidatePassword,userPassword){
    return await bcrypt.compare(candidatePassword,userPassword);
};
module.exports = mongoose.model('Admin',adminSchema);