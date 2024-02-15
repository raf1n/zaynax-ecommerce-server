const express = require("express");
const { UploadImageCloudinary } = require("../../middlewares/uploadCloudinary");
const ProductController = require("./product.controller");

const router = express.Router();

router.post(
  "/",
  UploadImageCloudinary.single("image"),
  ProductController.createProduct
);

router.get("/", ProductController.getAllProducts);

router.get("/active", ProductController.getActiveProducts);

router.get("/:productId", ProductController.getProductById);

router.patch(
  "/:productId",
  UploadImageCloudinary.single("image"),
  ProductController.updateProduct
);

router.delete("/:productId", ProductController.deleteProduct);

module.exports = router;
