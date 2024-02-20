const express = require("express");
const router = express.Router();
const PromotionController = require("./promotion.controller");

// Create a new promotion
router.post("/", PromotionController.createPromotion);

// Validate a promotion
router.post("/validate", PromotionController.validatePromotion);

// Get all promotions
router.get("/", PromotionController.getAllPromotions);

// Get a single promotion by ID
router.get("/:promotionId", PromotionController.getPromotionById);

// Update a promotion by ID
router.patch("/:promotionId", PromotionController.updatePromotionById);

// Delete a promotion by ID
router.delete("/:promotionId", PromotionController.deletePromotionById);

module.exports = router;
