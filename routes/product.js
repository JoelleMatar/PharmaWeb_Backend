import express from "express";
import { createProduct } from "../controllers/productController";
const router = express.Router();

router.post("/pharmacy/add-product", createProduct);

export default router;