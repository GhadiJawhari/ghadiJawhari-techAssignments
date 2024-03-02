const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = newSchema({
    firstName:{
        type:String,
        required:[true,"Firstname is required"],
        trim:true,
        minLength:3,
        maxLength:50,
    },
    lastName:{
        type:String,
        unique:true,
        required:[true,"last name is required"],
        trim:true,
        maxLength:70,
    },
    email:{
        type:String,
        unique:true,
        required:[true,"email is reqquired"],
        trim:true,
        maxLength:150,
        lowerCase:true,
    },
    phoneNumber:{
        type:String,
        unique:true,
        required:[true,"phone number is required"],
        trim:true,
        maxLength:20,
    },
    profilePicture:{
        type:String,
        default:" ",
    },
    friends:[{
        type:Schema.Types.ObjectId,
        ref:"User",
    },],
    followers:[{
        type:Schema.Types.ObjectId,
        ref:"User",
    },],
    following:[{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
],

},{timestamps:true}
);
module.exports = mongoose.model("User",userSchema);
