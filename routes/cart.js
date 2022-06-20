import express from "express";
import { createCart, deleteOrderItem, getCustomerCart, getCustomerCartUnconfirmed, updateOrderCheckout, } from "../controllers/cartController";
const router = express.Router();

router.post("/create-cart", createCart);
router.get("/cart-items/:id", getCustomerCart);
router.get("/cart-items-unconfirmed/:id", getCustomerCartUnconfirmed);
router.delete("/delete-order-item/:id", deleteOrderItem);
router.patch("/update-status-confirmation", updateOrderCheckout);

export default router;