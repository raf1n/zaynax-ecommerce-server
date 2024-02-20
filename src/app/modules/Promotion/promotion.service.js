const Promotion = require("./promotion.model");

const createPromotion = async (promotionData) => {
  const promotion = await Promotion.create(promotionData);
  return promotion;
};

const getAllPromotions = async () => {
  const promotions = await Promotion.find();
  return promotions;
};

const getPromotionById = async (promotionId) => {
  const promotion = await Promotion.findById(promotionId);
  return promotion;
};

const updatePromotionById = async (promotionId, updateData) => {
  const updatedPromotion = await Promotion.findByIdAndUpdate(
    promotionId,
    updateData,
    { new: true }
  );
  return updatedPromotion;
};

const deletePromotionById = async (promotionId) => {
  await Promotion.findByIdAndDelete(promotionId);
};

const getPromotionByCode = async (promoCode) => {
  const promotion = await Promotion.findOne({ promoCode });
  return promotion;
};

// const getPromotionUsageCount = async (promoCode) => {
//   try {
//     const promotion = await PromotionModel.findOne({ promoCode });

//     if (promotion) {
//       return promotion.usageCount;
//     } else {
//       return 0;
//     }
//   } catch (error) {
//     throw new Error("Error fetching promotion usage count");
//   }
// };

// const updatePromotionUsage = async (promoCode) => {
//   try {

//     const promotion = await PromotionModel.findOne({ promoCode });

//     if (promotion) {

//       promotion.usageCount += 1;

//       await promotion.save();
//     } else {
//       throw new Error('Promotion not found');
//     }
//   } catch (error) {
//     throw new Error('Error updating promotion usage count');
//   }
// };

module.exports = {
  createPromotion,
  getAllPromotions,
  getPromotionById,
  updatePromotionById,
  deletePromotionById,
  getPromotionByCode,
};
