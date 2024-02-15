const express = require("express");
const router = express.Router();
const OrderController = require("./order.controller");

// Create a new order
router.post("/", OrderController.createOrder);

// Get all orders
router.get("/", OrderController.getAllOrders);

// Get a single order by ID
router.get("/:orderId", OrderController.getOrderById);

// Update an order by ID
router.put("/:orderId", OrderController.updateOrderById);

// Delete an order by ID
router.delete("/:orderId", OrderController.deleteOrderById);

module.exports = router;
