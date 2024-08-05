import {
  orderController,
  getOrdersController,
} from "../controllers/orderController.js";

import express from "express";
const router = express.Router();

router.put("/api/order", orderController);

router.post("/api/getOrders", getOrdersController);

export default router;
