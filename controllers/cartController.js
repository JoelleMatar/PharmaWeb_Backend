import mongoose from "mongoose";
import Order from "../models/cart.js";
import Product from "../models/product.js";
import User from "../models/user.js";

export const createCart = async (req, res) => {
    const cart = req.body;
    console.log("cart", cart);

    const product = await Product.findById(cart.productId);
    try {
        const loggedUserHasOrder = await Order.find({ customerId: cart.customerId });
        console.log("loggedUserHasOrder", loggedUserHasOrder);
        loggedUserHasOrder?.map(order => {
            if (order.productId.toString() === cart.productId.toString() && order.status !== 3 && order.status !== 4) {
                return res.status(400).json({
                    message: "You already have this product in your cart"
                });
            }
            else {
                cart.status = 1;
                cart.totalPrice = cart.quantity * product.price;
                const newCart =  Order.create(cart);
                return res.status(201).json(newCart);
            }
        })
        // if (loggedUserHasOrder.productId !== cart.productId) {
        //     cart.status = 1;
        //     cart.totalPrice = cart.quantity * product.price;
        //     const newCart = await Order.create(cart);
        //     return res.status(201).json(newCart);
        // }
        // else if (loggedUserHasOrder.productId === cart.productId && loggedUserHasOrder.status !== 3 && loggedUserHasOrder.status !== 4) {
        //     console.log("differenttt")
        //     return res.status(400).json({ message: "You already have an order for this product" });
        // }

    }
    catch (error) {
        return res.status(500).json(error);
    }
}

export const getCustomerCart = async (req, res) => {
    try {

        const cart = await Order.find({ customerId: req.params.id });

        return res.json({ data: cart });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}