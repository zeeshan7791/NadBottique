const Order = require("../Models/orderModel");
const Product = require("../Models/productModel");
const errorHandler = require("../utils/error");

const createNewOrder = async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
console.log(req.body)
  try {
    const order = await Order.create({
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      message:"Order created",
      order,
    });
  } catch (error) {
    return next(error);
  }
};

const getSingleOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!order) {
      return next(new errorHandler("Order not found with this Id", 404));
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    return next(error);
  }
};

const myOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    return next(error);
  }
};

const getAllorders = async (req, res, next) => {
  try {
    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach((order) => {
      totalAmount += order.totalPrice;
    });

    res.status(200).json({
      success: true,
      totalAmount,
      orders,
    });
  } catch (error) {
    return next(error);
  }
};

const updateOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(errorHandler("Order not found with this Id", 404));
    }

    if (order.orderStatus === "Delivered") {
      return next(errorHandler("You have already delivered this order", 400));
    }

    if (req.body.status === "Shipped") {
      order.orderItems.forEach(async (o) => {
        await updateStock(o.product, o.quantity);
      });
    }
    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
      message: "order updated",
    });
  } catch (error) {
    return next(error);
  }
};
async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.stock -= quantity;

  await product.save({ validateBeforeSave: false });
}
const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new errorHandler("Order not found with this Id", 404));
    }

    await order.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "order deleted successfully",
    });
  } catch (error) {
    return next(error);
  }
};
module.exports = {
  createNewOrder,
  getSingleOrder,
  myOrders,
  getAllorders,
  updateOrder,
  deleteOrder,
};
