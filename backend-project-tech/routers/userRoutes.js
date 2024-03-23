const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/signup", userController.signUp);
router.delete("/delete", userController.deleteUser);
router.post("/login", userController.Login);

module.exports = router;
