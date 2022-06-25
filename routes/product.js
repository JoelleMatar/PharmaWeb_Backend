import express from "express";
import { createProduct, deleteProduct, getPharmacyNotification, getPharmacyNotifications, getPharmacyProducts, getPharmacyProductsbySearch, getProductbyName, getProductDetails, getProducts, getProductsAscendingbySearch, getProductsAscendingOrder, getProductsbySearch, getProductsDescendingbySearch, getProductsDescendingOrder, getProductsHighPrice, getProductsHighPricebySearch, getProductsLebanon, getProductsLowPrice, getProductsLowPricebySearch, getRequestedDrugs, getSearchedProductsSuggestions, requestDrug, updateIsReadNotif, uploadBulkProduct } from "../controllers/productController";
const router = express.Router();

router.post("/pharmacy/add-product", createProduct);
router.get("/pharmacy/productsList", getProducts);
router.get("/pharmacy/productsList-ascending", getProductsAscendingOrder);
router.get("/pharmacy/productsList-ascending/:search", getProductsAscendingbySearch);
router.get("/pharmacy/productsList-descending/:search", getProductsDescendingbySearch);
router.get("/pharmacy/productsList-descending", getProductsDescendingOrder);
router.get("/pharmacy/productsList-highprice", getProductsHighPrice);
router.get("/pharmacy/productsList-highprice/:search", getProductsHighPricebySearch);
router.get("/pharmacy/productsList-lowprice", getProductsLowPrice);
router.get("/pharmacy/productsList-lowprice/:search", getProductsLowPricebySearch);

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
router.delete("/pharmacy/delete-product/:id", deleteProduct)
export default router;