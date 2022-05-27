import express from "express";
import { createProduct, getPharmacyNotification, getPharmacyNotifications, getPharmacyProducts, getPharmacyProductsbySearch, getProductDetails, getProducts, getProductsbySearch, getRequestedDrugs, getSearchedProductsSuggestions, requestDrug } from "../controllers/productController";
const router = express.Router();

router.post("/pharmacy/add-product", createProduct);
router.get("/pharmacy/productsList", getProducts);
router.get("/pharmacy/productsList/:search", getProductsbySearch);
router.get("/pharmacy/pharmacyProductsList/:id", getPharmacyProducts);
router.get("/pharmacy/pharmacyProductsList/:id/:search", getPharmacyProductsbySearch);
router.get("/pharmacy/searchedProductsSuggestions/:search", getSearchedProductsSuggestions);

router.post("/request-drug", requestDrug);
router.get("/pharmacy/requested-drug/:id", getRequestedDrugs);
router.get("/pharmacy/notifications", getPharmacyNotifications);
router.get("/pharmacy/notification/:id", getPharmacyNotification);
router.get("/:id", getProductDetails);

export default router;