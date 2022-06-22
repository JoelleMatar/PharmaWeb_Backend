import express from "express";
import { createCart, deleteOrderItem, getCustomerCart, getCustomerCartUnconfirmed, updateOrderCheckout, getLoggedPharmacyOrders, getLoggedPharmacyOrdersbySearch, updateOrderStatus } from "../controllers/cartController";
const router = express.Router();

router.post("/create-cart", createCart);
router.get("/cart-items/:id", getCustomerCart);
router.get("/cart-items-unconfirmed/:id", getCustomerCartUnconfirmed);
router.delete("/delete-order-item/:id", deleteOrderItem);
router.patch("/update-status-confirmation", updateOrderCheckout);
router.get("/pharmacy-orders/:pharmaId", getLoggedPharmacyOrders);
router.get("/pharmacy/search-order/:pharmaId/:search", getLoggedPharmacyOrdersbySearch);
router.patch("/update-cart-status/:id", updateOrderStatus);


export default router;