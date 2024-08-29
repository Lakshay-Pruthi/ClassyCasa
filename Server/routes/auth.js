import {
  authenticateController,
  signUpController,
  logInController,
  updateUserDetailController,
  logoutUserController,
  forgotPasswordController,
} from "../controllers/authController.js";

import express from "express";
const router = express.Router();

router.get("/api/authenticate", authenticateController);
router.post("/api/signup", signUpController);
router.post("/api/login", logInController);
router.put("/api/updateUserDetails", updateUserDetailController);
// router.post("/api/forgotPassword/:sessionId", OTPVerificationController);
router.post("/api/forgotPassword", forgotPasswordController);
router.delete("/api/logout", logoutUserController);

export default router;
