import express from "express";
import {
  addOrderItems,
  getMyOrders,
  getOrders,
  getOrderById,
  updateOrderToPaid,
  deleteOrderById,
  getOrderDetailById,
  updateOrderToDelivered,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);
router.route("/myorders").get(protect, getMyOrders);
router
  .route("/:id")
  .delete(protect, admin, deleteOrderById)
  .get(protect, getOrderById);

router.route("/admin/detail/:id").get(protect, admin, getOrderDetailById);

export default router;
