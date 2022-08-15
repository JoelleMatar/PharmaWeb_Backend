import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";
import { loginValidation, signUpBuyerValidation, signUpPharmacyValidation } from "../middleware/YupValdiations.js";
import DonateDrug from "../models/donateDrug.js";
import Order from "../models/cart.js";
import Product from "../models/product.js";
import BuyerNotification from "../models/buyerNotification.js";

export const login = async (req, res) => {
    const { email, password } = req.body;
    const validation = { email, password }
    try {
        if (await loginValidation.validate(validation)) {
            const existingUser = await User.findOne({ email: email });

            if (!existingUser) return res.status(404).json({ message: "User doesn't exist" });

            const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

            if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

            const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.SECRET, { expiresIn: "24h" });

            res.status(200).json({ result: existingUser, token, message: "User Logged In Successfully!" });
        }
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const signUpBuyer = async (req, res) => {
    const { firstName, lastName, email, password, role, phoneNumber } = req.body;
    const validation = { firstName, lastName, email, password, role, phoneNumber };

    try {
        if (await signUpBuyerValidation.validate(validation)) {
            const exsistingUser = await User.findOne({ email });
            if (exsistingUser) return res.status(400).json({ message: "User already exists" });

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hashedPassword,
                phoneNumber: phoneNumber,
                role: 0
            };

            User.create(newUser);

            const activateToken = jwt.sign({ firstName, lastName, email, password, phoneNumber }, 'activateAccount', { expiresIn: '20m' });

            return res.status(201).json({ result: newUser, activateToken, message: "User Created Successfully!" });
        }
    }
    catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
}

export const signUpPharmacy = async (req, res) => {
    const { pharmacyName, city, email, password, role, phoneNumber, registrationYear, deliveryOptions, paymentOptions, pharmacyLicense } = req.body;
    const validation = { pharmacyName, city, email, password, role, phoneNumber, registrationYear, pharmacyLicense };

    try {
        if (await signUpPharmacyValidation.validate(validation)) {
            const exsistingUser = await User.findOne({ email });
            if (exsistingUser) return res.status(400).json({ message: "Pharmacy already exists" });

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = {
                pharmacyName: pharmacyName,
                city: city,
                email: email,
                password: hashedPassword,
                phoneNumber: phoneNumber,
                registrationYear: registrationYear,
                deliveryOptions: deliveryOptions,
                paymentOptions: paymentOptions,
                role: 1
            };

            console.log("new user", newUser);

            User.create(newUser);

            const activateToken = jwt.sign({ pharmacyName, city, email, password, phoneNumber }, 'activateAccount', { expiresIn: '20m' });

            return res.status(201).json({ result: newUser, activateToken, message: "Pharmacy Created Successfully!" });
        }
    }
    catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
}

export const getPharmaciesList = async (req, res) => {
    try {

        const pharmacies = await User.find({ role: 1 });

        return res.json({ data: pharmacies });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getUser = async (req, res) => {
    const userId = req.params.id;
    console.log("userid", userId)
    try {

        const user = await User.find({ _id: userId });

        return res.json({ data: user });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getUsers = async (req, res) => {
    try {

        const user = await User.find({ role: 0 });

        return res.json({ data: user });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPharmaciesbySearch = async (req, res) => {
    const search = req.params.search;
    try {

        const pharmacies = await Product.find({ pharmacyName: { $regex: search, $options: 'i' } });

        return res.json({ data: pharmacies });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updatePharmacy = async (req, res) => {
    const { id } = req.params;
    const { email, phoneNumber, city, registrationYear, pharmacyName, deliveryOptions, paymentOptions, firstName, lastName } = req.body;

    const exsistingUser = await User.findOne({ email: email });
    const user = await User.findById(id);

    if (user.role == 1 && email === user.email && (pharmacyName !== user.pharmacyName || phoneNumber !== user.phoneNumber || city !== user.city || registrationYear !== user.registrationYear || deliveryOptions !== user.deliveryOptions || paymentOptions !== user.paymentOptions)) {

        const updatedUser = { pharmacyName, phoneNumber, city, registrationYear, deliveryOptions, paymentOptions, _id: id };
        const result = await User.findByIdAndUpdate(id, updatedUser, { new: true });

        // const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: "1h" });
        res.status(201).json({ result, message: "Pharmacy Updated Successfully!" });

    }
    else if (user.role == 0 && email === user.email && (phoneNumber !== user.phoneNumber || firstName !== user.firstName || lastName !== user.lastName)) {
        const updatedUser = { firstName, phoneNumber, lastName, _id: id };
        const result = await User.findByIdAndUpdate(id, updatedUser, { new: true });

        // const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: "1h" });
        res.status(201).json({ result, message: "Buyer Updated Successfully!" });
    }
    else if (email === user.email && pharmacyName === user.pharmacyName && phoneNumber === user.phoneNumber && city === user.city && registrationYear === user.registrationYear && deliveryOptions === user.deliveryOptions && paymentOptions === user.paymentOptions) {
        return res.status(400).json({ message: "no changes were made" });
    }
}

export const donateDrug = async (req, res) => {
    const donated = req.body;
    console.log("donated", donated);


    try {
        const newDonateDrug = await DonateDrug.create(donated);
        const notif = {
            donateDrugId: newDonateDrug._id,
            isRead: false,
        }

        console.log("notif", notif)

        const newPharmacyNotification = await BuyerNotification.create(notif);
        return res.status(201).json({ newDonateDrug });
    }
    catch (error) {
        return res.status(500).json(error);
    }
}

export const buyerOrders = async (req, res) => {

    try {
        const orders = await Order.find({ customerId: req.params.id }).sort({ createdAt: -1 });
        const products = await Product.find({ _id: orders.map(order => order.productId) })
        const pharmacies = await User.find({ _id: products.map(prod => prod.pharmaId) })
        return res.status(200).json({ success: true, message: "orders fetched successfully", data: { orders, products, pharmacies } })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json(err);
    }
}

export const buyerNotifications = async (req, res) => {
    try {

        const donatedDrugs = await DonateDrug.find({ _id: req.params.id });

        return res.json({ data: donatedDrugs });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getBuyerNotifications = async (req, res) => {
    try {
        // const notifications = await Notification.find({});

        // return res.json({ data: notifications });

        const notifications = await BuyerNotification.find({}).sort({ _id: -1 });

        const donatedDrug = await DonateDrug.find({ _id: notifications.map(notif => notif.donateDrugId) });

        // const users = await User.find({ _id: donatedDrug.map(user => user.userId) });

        return res.json({ data: notifications, donatedDrug });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getBuyerNotification = async (req, res) => {
    try {

        const notification = await BuyerNotification.find({ _id: req.params.id });

        return res.json({ data: notification });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updateIsReadNotif = async (req, res) => {
    const { id } = req.params;
    const updatedNotif = { isRead: true, _id: id };

    console.log("updated", updatedNotif);
    console.log("id:", id);

    try {
        await BuyerNotification.findByIdAndUpdate(id, { isRead: true }, { new: true });

        return res.json(updatedNotif);
    } catch (error) {
        return res.status(404).send(`No notif with id: ${id}`);
    }
}