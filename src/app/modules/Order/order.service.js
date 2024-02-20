const Order = require("./order.model");

const createOrder = async (orderData) => {
  const order = await Order.create(orderData);
  return order;
};

const getAllOrders = async (status) => {
  if (status === "all") {
    const orders = await Order.find();
    return orders;
  } else {
    const orders = await Order.find({ status });
    return orders;
  }
};

const getOrderById = async (orderId) => {
  const order = await Order.findById(orderId);
  return order;
};

const updateOrderById = async (orderId, updateData) => {
  const updatedOrder = await Order.findByIdAndUpdate(orderId, updateData, {
    new: true,
  });
  return updatedOrder;
};

const deleteOrderById = async (orderId) => {
  await Order.findByIdAndDelete(orderId);
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderById,
  deleteOrderById,
};
