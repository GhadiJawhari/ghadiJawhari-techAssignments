const express = require("express");
const app = express();
const DB = require("./database").connectDB;
const router =express.Router;

//const adminRoutes = require("./routers/adminRoutes");
const userRoutes = require("./routers/userRoutes");

DB();

app.use(express.json())

app.listen(3000,()=>{
    console.log("server is running on port 3000");
});
//app.use("/api/admin",adminRoutes);
app.use("/api/user",userRoutes);
module.exports = router;