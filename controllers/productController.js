import Notification from "../models/notification.js";
import Product from "../models/product.js";
import RequestDrug from "../models/requestDrug.js";
import User from "../models/user.js";

export const createProduct = async (req, res) => {
    const post = req.body;
    console.log("post");
    try {
        const newPost = await Product.create(post);
        return res.status(201).json(newPost);
    }
    catch (error) {
        return res.status(500).json(error);
        console.log(error);
    }
}

export const getProducts = async (req, res) => {
    try {

        const products = await Product.find({});

        return res.json({ data: products });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPharmacyProducts = async (req, res) => {
    try {

        const products = await Product.find({ pharmaId: req.params.id });

        return res.json({ data: products });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getProductDetails = async (req, res) => {
    try {

        const product = await Product.find({ _id: req.params.id });

        return res.json({ data: product });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getSearchedProductsSuggestions = async (req, res) => {
    console.log("req.params.search", req.params.search);
    try {

        const products = await Product.find({ productName: req.params.search });
        const pharmaIds = products.map(product => product.pharmaId);

        const pharmacies = await User.find({ _id: pharmaIds })

        return res.json({ data: { products, pharmacies } });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getProductsbySearch = async (req, res) => {
    const search = req.params.search;
    try {

        const products = await Product.find({ productName: { $regex: search, $options: 'i' } });

        return res.json({ data: products });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPharmacyProductsbySearch = async (req, res) => {
    const search = req.params.search;
    const pharmaId = req.params.id;
    try {

        const products = await Product.find({ pharmaId: pharmaId, productName: { $regex: search, $options: 'i' } });

        return res.json({ data: products });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const requestDrug = async (req, res) => {
    const requested = req.body;
    console.log("requested", requested);


    try {
        const newRequestDrug = await RequestDrug.create(requested);
        const notif = {
            requestdrugId: newRequestDrug._id,
            isRead: false,
        }

        console.log("notif", notif)

        const newPharmacyNotification = await Notification.create(notif);
        return res.status(201).json({ newRequestDrug, newPharmacyNotification });
    }
    catch (error) {
        return res.status(500).json(error);
    }
}

export const getPharmacyNotifications = async (req, res) => {
    try {
        // const notifications = await Notification.find({});

        // return res.json({ data: notifications });

        const notifications = await Notification.find({});

        const requestedDrug = await RequestDrug.find({ _id: notifications.map(notif => notif.requestdrugId) });

        const users = await User.find({ _id: requestedDrug.map(user => user.userId) });

        return res.json({ data: notifications, requestedDrug, users });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPharmacyNotification = async (req, res) => {
    try {

        const notifications = await Notification.find({ _id: req.params.id });
        const requestedDrug = await RequestDrug.find({ _id: notifications.requestdrugId });
        const users = await User.find({ _id: requestedDrug.userId });

        const test = {
            notification: notifications,
            requestD: requestedDrug,
            user: users
        }

        console.log("test", test)


        return res.json({ data: notifications, requestedDrug, users });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getRequestedDrugs = async (req, res) => {
    try {

        const requestedDrugs = await RequestDrug.find({_id: req.params.id});

        return res.json({ data: requestedDrugs });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getNotifRequestedDrugs = async (req, res) => {
    try {

        const requestedDrugs = await RequestDrug.find({ _id: req.body.id });

        return res.json({ data: requestedDrugs });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}