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
        if (loggedUserHasOrder.length > 0) {
            loggedUserHasOrder?.map(order => {
                if (order.productId.toString() === cart.productId.toString() && order.status !== 3 && order.status !== 4) {
                    return res.status(400).json({
                        success: false,
                        message: "You already have this product in your cart"
                    });
                }
                else {
                    cart.status = 1;
                    cart.totalPrice = cart.quantity * product.price;
                    const newCart = Order.create(cart);
                    return res.status(201).json(newCart);
                }

            })
        } else {
            cart.status = 1;
            cart.totalPrice = cart.quantity * product.price;
            const newCart = Order.create(cart);
            return res.status(201).json(newCart);
        }
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

export const getCustomerCartUnconfirmed = async (req, res) => {
    try {

        const cart = await Order.find({ customerId: req.params.id, status: 1 });

        return res.json({ data: cart });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const deleteOrderItem = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);

        return res.json({ success: true, message: "Order deleted successfully" });
    }
    catch (err) {
        res.status(404).json({ message: error.message });
    }
}

export const updateOrderCheckout = async (req, res) => {
   
    const carts = req.body;
     console.log("req.body", carts);
    try {
        carts.map(async(cart) => {
            const order = await Order.findByIdAndUpdate(cart, { status: 2 });
        })

        return res.json({ success: true, message: "Order updated successfully", carts });
    }
    catch(err) {
        res.status(404).json({ message: error.message });
    }
}