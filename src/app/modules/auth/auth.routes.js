const express = require("express");
const AuthController = require("./auth.controller");

const router = express.Router();

router.post("/login", AuthController.login);

router.post("/admin/register", AuthController.adminRegister);

router.post("/admin/login", AuthController.adminLogin);

module.exports = router;
