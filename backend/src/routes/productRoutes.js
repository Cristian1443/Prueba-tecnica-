import express from 'express';
import {
  getAllProductsController,
  getProductByIdController,
  createProductController,
  updateProductController,
  deleteProductController
} from '../controllers/productController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { validateProduct } from '../validators/validationMiddleware.js';

const router = express.Router();

// Se añade el middleware de validación a las rutas que crean/actualizan
router.route('/')
  .get(getAllProductsController)
  .post(protect, validateProduct, createProductController);

router.route('/:id')
  .get(getProductByIdController)
  .put(protect, validateProduct, updateProductController)
  .delete(protect, deleteProductController);

export default router; 