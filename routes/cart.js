import express from "express";
import { createCart, deleteOrderItem, getCustomerCart, getCustomerCartUnconfirmed, updateOrderCheckout, getLoggedPharmacyOrders, getLoggedPharmacyOrdersbySearch, updateOrderStatus, updateOrderPrescription, getLoggedPharmacyOrdersToday, stripePayment } from "../controllers/cartController";
const router = express.Router();

router.post("/create-cart", createCart);
router.get("/cart-items/:id", getCustomerCart);
router.get("/cart-items-unconfirmed/:id", getCustomerCartUnconfirmed);
router.delete("/delete-order-item/:id", deleteOrderItem);
router.patch("/update-status-confirmation", updateOrderCheckout);
router.get("/pharmacy-orders/:pharmaId", getLoggedPharmacyOrders);
router.get("/pharmacy-orders-today/:pharmaId", getLoggedPharmacyOrdersToday);
router.get("/pharmacy/search-order/:pharmaId/:search", getLoggedPharmacyOrdersbySearch);
router.patch("/update-cart-status/:id", updateOrderStatus);
router.patch("/add-prescription", updateOrderPrescription);
router.post("/stripe/pay", stripePayment);


export default router;