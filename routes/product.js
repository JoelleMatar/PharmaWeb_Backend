import express from "express";
import { createProduct, getPharmacyNotification, getPharmacyNotifications, getPharmacyProducts, getPharmacyProductsbySearch, getProductbyName, getProductDetails, getProducts, getProductsbySearch, getProductsLebanon, getRequestedDrugs, getSearchedProductsSuggestions, requestDrug, updateIsReadNotif, uploadBulkProduct } from "../controllers/productController";
const router = express.Router();

router.post("/pharmacy/add-product", createProduct);
router.get("/pharmacy/productsList", getProducts);
router.get("/pharmacy/productsLebanon", getProductsLebanon);
router.get("/pharmacy/productsList/:search", getProductsbySearch);
router.get("/pharmacy/pharmacyProductsList/:id", getPharmacyProducts);
router.get("/pharmacy/pharmacyProductsList/:id/:search", getPharmacyProductsbySearch);
router.get("/pharmacy/searchedProductsSuggestions/:search", getSearchedProductsSuggestions);

router.post("/request-drug", requestDrug);
router.get("/pharmacy/requested-drug/:id", getRequestedDrugs);
router.get("/pharmacy/notifications", getPharmacyNotifications);
router.get("/pharmacy/notification/:id", getPharmacyNotification);
router.get("/:id", getProductDetails);
router.patch('/pharmacy-notif/:id', updateIsReadNotif);
router.get("/pharmacy/prod-name", getProductbyName);
router.post("/pharmacy/bulk-upload", uploadBulkProduct);

export default router;