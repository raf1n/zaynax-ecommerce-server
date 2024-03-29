const mongoose = require("mongoose");

const PromotionSchema = new mongoose.Schema(
  {
    promoCode: { type: String, required: true, unique: true },
    useTime: { type: Number, required: true },
    discount: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["active", "deactive"],
      default: "deactive",
    },
    // usageCount: {
    //   type: Number,
    //   default: 0, // Default value is 0
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Promotion", PromotionSchema);
