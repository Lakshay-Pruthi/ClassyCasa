import {
  getOrdersController,
  checkoutController,
  couponController,
} from "../controllers/orderController.js";

import express from "express";
const router = express.Router();

router.post("/api/couponDiscount", couponController);
router.post("/api/checkout", checkoutController);
router.post("/api/getOrders", getOrdersController);

export default router;
