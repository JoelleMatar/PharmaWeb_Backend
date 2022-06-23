import mongoose from "mongoose";
import Order from "../models/cart.js";
import Logs from "../models/logs.js";
import Product from "../models/product.js";
import User from "../models/user.js";

export const createLog = async (req, res) => {
    const log = req.body;
    console.log("cart", log);

    try {
        const product = await Product.findById(req.params.id)
        const refill = {
            productId: req.params.id,
            productName: req.body.productName,
            pharmaId: req.body.pharmaId,
            type: "Refill Stock",
            supplierName: req.body.supplierName,
            previousStock: product.stock,
            currentStock: product.stock + req.body.stock
        }
        const newLog = await Logs.create(refill);

        await Product.updateOne({ _id: req.params.id },
            {
                $set: {
                    stock: product.stock + req.body.stock
                }
            })
        return res.status(201).json(newLog);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getLogs = async (req, res) => {

    try {

        const logs = await Logs.find({ pharmaId: req.params.id });

        return res.json({ data: logs });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updateOrderStatus = async (req, res) => {

    console.log("req.body", req.body, req.params);
    try {
        const order = await Order.updateOne({ _id: req.params.id },
            {
                $set: {
                    status: req.body.status
                }
            })
        return res.json({ success: true, message: "Order status updated successfully", order });
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
}