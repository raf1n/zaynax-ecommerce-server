const OrderService = require("./order.service");
const sendResponse = require("../../../shared/sendResponse");

const createOrder = async (req, res, next) => {
  try {
    const order = await OrderService.createOrder(req.body);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Order created successfully",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

const getAllOrders = async (req, res, next) => {
  try {
    const status = req.query.status;
    const orders = await OrderService.getAllOrders(status);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Orders retrieved successfully",
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    const order = await OrderService.getOrderById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Order retrieved successfully",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

const updateOrderById = async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    const updatedOrder = await OrderService.updateOrderById(orderId, req.body);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Order updated successfully",
      data: updatedOrder,
    });
  } catch (error) {
    next(error);
  }
};

const deleteOrderById = async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    await OrderService.deleteOrderById(orderId);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Order deleted successfully",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderById,
  deleteOrderById,
};
