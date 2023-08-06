import {
  authenticateController,
  signUpController,
  logInController,
  orderController,
  getOrdersController,
  updateUserDetailController,
} from "../controllers/authController.js";

import express from "express";
const router = express.Router();

router.get("/api/authenticate", authenticateController);

router.post("/api/signup", signUpController);
router.post("/api/login", logInController);
router.put("/api/updateUserDetails", updateUserDetailController);

router.put("/api/order", orderController);

router.post("/api/getOrders", getOrdersController);

export default router;
