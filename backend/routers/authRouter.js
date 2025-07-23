const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/authMiddleware");
const { postLogin, postLogout, getUserInfo, postSignup, postResetPassword, patchNewPassword } = require("../controllers/authController");

router.post("/auth/login", postLogin);

router.post("/auth/signup", postSignup);

router.post("/auth/logout", requireAuth, postLogout);

router.get("/auth/retrieveUserInfo", requireAuth, getUserInfo);

router.patch("/auth/resetPassword", patchNewPassword);

router.post("/auth/authCode", postResetPassword);

module.exports = router;
