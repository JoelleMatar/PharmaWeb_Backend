import express from "express";
import { createProduct, getPharmacyProducts, getPharmacyProductsbySearch, getProducts, getProductsbySearch, getSearchedProductsSuggestions } from "../controllers/productController";
const router = express.Router();

router.post("/pharmacy/add-product", createProduct);
router.get("/pharmacy/productsList", getProducts);
router.get("/pharmacy/productsList/:search", getProductsbySearch);
router.get("/pharmacy/pharmacyProductsList/:id", getPharmacyProducts);
router.get("/pharmacy/pharmacyProductsList/:id/:search", getPharmacyProductsbySearch);
router.get("/pharmacy/searchedProductsSuggestions/:search", getSearchedProductsSuggestions);

export default router;