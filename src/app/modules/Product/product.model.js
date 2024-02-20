const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    discount: { type: Number, required: true },
    image: { type: Object, required: true },
    size: { type: String },
    color: { type: String },
    price: { type: Number, required: true },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    shippingCharge: { type: Number, default: 100 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
