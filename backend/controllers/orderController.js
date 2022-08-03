import asyncHandler from "express-async-handler";
import Order from "../models/ordermodel.js";

// @desc Create new order
// @routes POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else {
    const order = new Order({
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      user: req.user._id,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// @desc Get order by ID
// @routes GET /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc Update order to paid
// @routes GET /api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.receipt_email,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc Update order to delivered
// @routes GET /api/orders/:id/deliver
// @access Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc Get logged in user orders
// @routes GET /api/orders/myorders
// @access Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({
    user: req.user._id,
  });
  res.json(orders);
});

// @desc Get all orders
// @routes GET /api/orders
// @access Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const pageSize = 2;
  const page = Number(req.query.pageNumber || 1);

  const keyword = req.query.keyword
    ? {
        _id: req.query.keyword,
      }
    : {};

  const count = await Order.count({ ...keyword });
  const orders = await Order.find({ ...keyword })
    .populate("user", "id name email")
    .populate({
      path: "orderItems",
      model: "order",
      populate: {
        path: "product",
        model: "Product",
        populate: {
          path: "user",
          model: "User",
        },
      },
    })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ orders, page, pages: Math.ceil(count / pageSize) });
});

// @desc Get order by Id
// @routes GET /api/orders/admin/detail/:id
// @access Private/Admin
const getOrderDetailById = asyncHandler(async (req, res) => {
  const orders = await Order.findById(req.params.id)
    .populate("user", "id name email")
    .populate({
      path: "orderItems",
      model: "order",
      populate: {
        path: "product",
        model: "Product",
        populate: {
          path: "user",
          model: "User",
        },
      },
    });
  res.json(orders);
});

// @desc Delete a order
// @routes DELETE /api/orders/:id
// @access Private/Admin
const deleteOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    await order.remove();
    res.json({ message: "order removed " });
  } else {
    res.status(404);
    throw new Error("order not found");
  }
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  deleteOrderById,
  getOrderDetailById,
  updateOrderToDelivered,
};
