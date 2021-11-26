import express from "express";
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  getAllProducts,
  createReview,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(protect, admin, createProduct)
  .get(getProducts)
  .get(protect, admin, getAllProducts);

router.route("/:id/reviews").post(protect, createReview);

router
  .route("/:id")
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct)
  .get(getProductById);

export default router;
