const PromotionService = require("./promotion.service");
const sendResponse = require("../../../shared/sendResponse");
const isWithinDateRange = require("../../../utils/withinDateRange");

const createPromotion = async (req, res, next) => {
  try {
    const promotion = await PromotionService.createPromotion(req.body);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Promotion created successfully",
      data: promotion,
    });
  } catch (error) {
    next(error);
  }
};

const getAllPromotions = async (req, res, next) => {
  try {
    const promotions = await PromotionService.getAllPromotions();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Promotions retrieved successfully",
      data: promotions,
    });
  } catch (error) {
    next(error);
  }
};

const getPromotionById = async (req, res, next) => {
  try {
    const promotionId = req.params.promotionId;
    const promotion = await PromotionService.getPromotionById(promotionId);
    if (!promotion) {
      return res.status(404).json({
        success: false,
        message: "Promotion not found",
      });
    }
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Promotion retrieved successfully",
      data: promotion,
    });
  } catch (error) {
    next(error);
  }
};

const updatePromotionById = async (req, res, next) => {
  try {
    const promotionId = req.params.promotionId;

    const updatedPromotion = await PromotionService.updatePromotionById(
      promotionId,
      req.body
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Promotion updated successfully",
      data: updatedPromotion,
    });
  } catch (error) {
    next(error);
  }
};

const deletePromotionById = async (req, res, next) => {
  try {
    const promotionId = req.params.promotionId;
    await PromotionService.deletePromotionById(promotionId);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Promotion deleted successfully",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

const validatePromotion = async (req, res, next) => {
  try {
    const { promoCode } = req.body;

    const promotion = await PromotionService.getPromotionByCode(promoCode);

    // const usageCount = await PromotionService.getPromotionUsageCount(promoCode);
    // if (usageCount >= promotion.useTime) {
    //   sendResponse(res, {
    //     statusCode: 200,
    //     success: false,
    //     message: "Promotion has reached its usage limit",
    //     data: { valid: false },
    //   });
    //   return;
    // }

    if (
      promotion &&
      promotion?.status === "active" &&
      isWithinDateRange(promotion.startDate, promotion.endDate)
    ) {
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Valid Promo Code",
        data: { valid: true, promotion },
      });
    } else if (promotion) {
      sendResponse(res, {
        statusCode: 200,
        success: false,
        message: "Invalid promotion code or expired",
        data: { valid: false },
      });
    } else {
      sendResponse(res, {
        statusCode: 200,
        success: false,
        message: "Promotion code not found",
        data: { valid: false },
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPromotion,
  getAllPromotions,
  getPromotionById,
  updatePromotionById,
  deletePromotionById,
  validatePromotion,
};
