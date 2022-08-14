import mongoose from "mongoose";
import Order from "../models/cart.js";
import Product from "../models/product.js";
import User from "../models/user.js";
import { ObjectId } from "bson";
import Logs from "../models/logs.js";

export const createCart = async (req, res) => {
    const cart = req.body;
    console.log("cart", cart);


    try {
        const product = await Product.findById(cart.productId);
        const loggedUserHasOrder = await Order.find({ customerId: cart.customerId });
        const loggedUserHasOrderSameProductNotDelivered = await Order.find({
            customerId: cart.customerId,
            productId: cart.productId,
            status: { $nin: [1, 3, 4] }
        });
        const loggedUserHasOrderInCart = await Order.find({
            customerId: cart.customerId,
            productId: cart.productId,
            status: { $eq: 1 }
        });

        console.log("loggedUserHasOrder", loggedUserHasOrderSameProductNotDelivered.length);
        loggedUserHasOrderSameProductNotDelivered.map(order => {
            console.log("order status ", order.status)
        })
        if (loggedUserHasOrder.length > 0) {
            console.log("yessss has order")
            if (loggedUserHasOrderInCart.length > 0) {
                console.log("yessss has order in cartt")
                return res.status(400).json({
                    success: false,
                    message: "You already have this product in your cart"
                });
            }
            else if (loggedUserHasOrderSameProductNotDelivered.length > 0) {
                console.log("yessss has order but can add new")
                cart.status = 1;
                cart.totalPrice = cart.quantity * product.price;
                const newCart = await Order.create(cart);

                return res.status(201).json({ newCart });
            }
            else {
                console.log("new orderr")
                cart.status = 1;
                cart.totalPrice = cart.quantity * product.price;
                const newCart = Order.create(cart);
                return res.status(201).json(newCart);
            }

        }
        else {
            console.log("noooo order")
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
        res.status(404).json({ message: err.message });
    }
}

export const updateOrderCheckout = async (req, res) => {

    const carts = req.body;
    console.log("req.body", carts);
    try {
        carts?.formData?.map(async (cart, index) => {
            console.log("ejjjkjk", cart)
            const orderdets = await Order.findById(cart);
            const customerOrders = await Order.find({ customerId: orderdets.customerId })
            // console.log("customerOrders", customerOrders)

            const userOrders = [];
            customerOrders.map(order => {
                console.log("orderdaaa", order.updatedAt.toLocaleString().split(',')[0])
                userOrders.push(order.updatedAt.toLocaleString().split(',')[0])
            })
            // console.log("orderdate", userOrders)

            const d = new Date()
            if (!userOrders.includes(d.toLocaleString().split(',')[0])) {
                const order = await Order.findByIdAndUpdate(cart, { status: 2 });
                return res.json({ success: true, message: "Order updated successfully", order });
            }
            else {
                return res.json({ success: false, message: "You have already made a purchase today" });
            }
        })



    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const getLoggedPharmacyOrders = async (req, res) => {
    console.log("loggedpharma", req.params.pharmaId);

    try {
        const products = await Product.find({ pharmaId: req.params.pharmaId });

        const cartPharma = await Order.find({ status: { $ne: 1 }, productId: products.map(prod => prod._id) }).sort({ createdAt: -1 });

        const customers = await User.find({ _id: cartPharma.map(cart => cart.customerId) });

        return res.json({ success: true, products, cartPharma, customers });
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
}


export const getLoggedPharmacyOrdersToday = async (req, res) => {
    console.log("loggedpharma", req.params.pharmaId);
    const today = new Date();
    const todayiso = today.toISOString();
    const day = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
    console.log("today", today.toISOString(), day)

    try {
        const products = await Product.find({ pharmaId: req.params.pharmaId });

        const cartPharma = await Order.find({ status: { $ne: 1 }, productId: products.map(prod => prod._id), createdAt: { $gt: day } }).sort({ createdAt: -1 });

        const customers = await User.find({ _id: cartPharma.map(cart => cart.customerId) });

        return res.json({ success: true, products, cartPharma, customers });
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const getLoggedPharmacyOrdersbySearch = async (req, res) => {
    const search = req.params.search;
    console.log("search", search)
    const pharmaId = req.params.pharmaId;
    try {
        let products = await Product.find(
            {
                pharmaId: pharmaId,
                productName: {
                    $regex: search, $options: 'i'
                }
            }
        );

        if (products.length === 0) {
            products = await Product.find({ pharmaId: req.params.pharmaId });

            const cartPharma = await Order.find(
                {
                    status: { $ne: 1 },
                    productId: products.map(prod => ObjectId(prod._id).str),
                    $or: [
                        {
                            deliverOption: {
                                $regex: search, $options: 'i'
                            }
                        }
                    ]
                }
            );

            console.log("search", search, pharmaId, products, cartPharma)
            const customers = await User.find(
                {
                    _id: cartPharma.map(cart => cart.customerId),
                    $or: [
                        {
                            firstName: {
                                $regex: search, $options: 'i'
                            }
                        },
                        {
                            lastName: {
                                $regex: search, $options: 'i'
                            }
                        },
                        {
                            pharmacyName: {
                                $regex: search, $options: 'i'
                            }
                        }
                    ]
                }
            );
        }
        const cartPharma = await Order.find(
            {
                status: { $ne: 1 },
                productId: products.map(prod => ObjectId(prod._id).str),
                $or: [
                    {
                        deliverOption: {
                            $regex: search, $options: 'i'
                        }
                    }
                ]
            }
        );

        console.log("search", search, pharmaId, products, cartPharma)
        const customers = await User.find(
            {
                _id: cartPharma.map(cart => cart.customerId),
                $or: [
                    {
                        firstName: {
                            $regex: search, $options: 'i'
                        }
                    },
                    {
                        lastName: {
                            $regex: search, $options: 'i'
                        }
                    },
                    {
                        pharmacyName: {
                            $regex: search, $options: 'i'
                        }
                    }
                ]
            }
        );

        return res.json({ success: true, products, cartPharma, customers });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const updateOrderStatus = async (req, res) => {
    console.log("req.body", req.body, req.params);
    try {
        //update order status
        const order = await Order.updateOne({ _id: req.params.id },
            {
                $set: {
                    status: req.body.status
                }
            })

        //add log of type purchase item to keep track of product stock
        if (req.body.status === 3 || req.body.status === 4) {

            const orderDetail = await Order.findById(req.params.id);
            const product = await Product.findById(orderDetail.productId);
            console.log("prodddd", product);
            const logsData = {
                previousStock: product.stock,
                currentStock: product.stock - orderDetail.quantity,
                productName: product.productName,
                pharmaId: product.pharmaId,
                type: "Item Purchased"
            }
            const newLog = await Logs.create(logsData)

            //update product stock after order was delivered or pickedup
            const updateProductStock = await Product.updateOne({ _id: orderDetail.productId },
                {
                    $set: {
                        stock: product.stock - orderDetail.quantity
                    }
                })


        }
        return res.json({ success: true, message: "Order status updated successfully", order });
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const updateOrderPrescription = async (req, res) => {
    // console.log("req.body", req.body)
    try {
        const updatePrescription = await Order.updateOne({ _id: req.body.cartId },
            {
                $set: {
                    prescription: req.body.prescription
                }
            })

        // const order = Order.findById(req.body.cartId)
        return res.json({ success: true, message: "Order prescrition added successfully" });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}