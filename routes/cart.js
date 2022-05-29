import express from "express";
import { createCart, getCustomerCart } from "../controllers/cartController";
import { createProduct, getPharmacyNotification, getPharmacyNotifications, getPharmacyProducts, getPharmacyProductsbySearch, getProductDetails, getProducts, getProductsbySearch, getRequestedDrugs, getSearchedProductsSuggestions, requestDrug, updateIsReadNotif } from "../controllers/productController";
const router = express.Router();

router.post("/create-cart", createCart);
router.get("/cart-items/:id", getCustomerCart);


export default router;