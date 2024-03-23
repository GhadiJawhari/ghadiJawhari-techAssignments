const express = require('express');
const router = express.Router();
const adminController = require("./controllers/adminController");

router.post("/addProduct", adminController.addNewProduct);
router.delete("/deleteProduct", adminController.removeProduct);
//router.get("/", adminController.getProductDetails);
router.post("/adminsignup", adminController.adminsignUp);
router.post("/adminlogin", adminController.adminLogin);
router.delete("/deleteadmin",adminController.deleteAdmin);

module.exports = router;
