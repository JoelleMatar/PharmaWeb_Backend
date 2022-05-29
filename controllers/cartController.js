import mongoose from "mongoose";
import Cart from "../models/cart.js";
import Product from "../models/product.js";


export const createCart = async (req, res) => {
    const cart = req.body;
    console.log("cart", cart);
    try {
        const newCart = await Cart.create(cart);
        return res.status(201).json(newCart);
    }
    catch (error) {
        return res.status(500).json(error);
    }
}

export const getCustomerCart = async (req, res) => {
    try {

        const cart = await Cart.find({ customerId: req.params.id });

        return res.json({ data: cart });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}