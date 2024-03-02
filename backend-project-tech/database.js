const mongoose = require("mongoose");
require("dotenv").config();

exports.connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MongoDB_URI);
        console.log("MONGODB CONNECTED!!");

    }catch(err){
        console.error(err);
        process.exit(1);
    }
}