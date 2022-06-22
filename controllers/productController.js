import mongoose from "mongoose";
import Notification from "../models/notification.js";
import Product from "../models/product.js";
import ListProducts from "../models/productsList.js";
import RequestDrug from "../models/requestDrug.js";
import User from "../models/user.js";
import csvtojson from "csvtojson";


export const createProduct = async (req, res) => {
    const post = req.body;
    console.log("post");
    try {
        const prodExist = await Product.findOne({ productName: post.productName, form: post.form });
        if (prodExist) {
            res.status(400).json({ message: "Product already exists" });
        } else {
            const newPost = await Product.create(post);
            await ListProducts.create(post);
            return res.status(201).json(newPost);
        }
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

export const getProductsLebanon = async (req, res) => {
    try {

        const products = await ListProducts.find({}).sort({ productName: 1 });

        return res.json({ data: products });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPharmacyProducts = async (req, res) => {
    try {

        const products = await Product.find({ pharmaId: req.params.id });
        const productsName = products.map(product => product.productName);

        const generalInfo = await ListProducts.find({ productName: productsName });


        return res.json({ data: products, generalInfo });
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

        const products = await Product.find(
            {
                $or: [
                    {
                        productName: {
                            $regex: search, $options: 'i'
                        }
                    },
                    {
                        city: {
                            $regex: search, $options: 'i'
                        }
                    }
                ]
            }
        );

        return res.json({ data: products });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}



export const getPharmacyProductsbySearch = async (req, res) => {
    const search = req.params.search;
    const pharmaId = req.params.id;
    try {

        let products = await Product.find(
            {
                pharmaId: pharmaId,
                $or: [
                    {
                        productName: {
                            $regex: search, $options: 'i'
                        }
                    },
                    {
                        agent: {
                            $regex: search, $options: 'i'
                        }
                    },
                    {
                        laboratory: {
                            $regex: search, $options: 'i'
                        }
                    }
                ]
            }
        );

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

        const notifications = await Notification.find({}).sort({ _id: -1 });

        const requestedDrug = await RequestDrug.find({ _id: notifications.map(notif => notif.requestdrugId) });

        const users = await User.find({ _id: requestedDrug.map(user => user.userId) });

        return res.json({ data: notifications, requestedDrug, users });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPharmacyNotification = async (req, res) => {
    try {

        const notification = await Notification.find({ _id: req.params.id });

        return res.json({ data: notification });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getRequestedDrugs = async (req, res) => {
    try {

        const requestedDrugs = await RequestDrug.find({ _id: req.params.id });

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

export const updateIsReadNotif = async (req, res) => {
    const { id } = req.params;
    const updatedNotif = { isRead: true, _id: id };

    console.log("updated", updatedNotif);
    console.log("id:", id);

    try {
        await Notification.findByIdAndUpdate(id, { isRead: true }, { new: true });

        return res.json(updatedNotif);
    } catch (error) {
        return res.status(404).send(`No notif with id: ${id}`);
    }
}

export const getProductbyName = async (req, res) => {
    try {

        const product = await ListProducts.find({ productName: req.body.productName });

        return res.json({ data: product });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const uploadBulkProduct = (req, res) => {
    // CSV file name
    console.log("reqqqq", req.body)
    const fileName = req.body.file;
    var arrayToInsert = [];
    csvtojson().fromFile(fileName).then(source => {
        // Fetching the all data from each row
        for (var i = 0; i < source.length; i++) {
            var oneRow = {
                productName: source[i]['Product Name'],
                form: source[i]['Form'],
                dosage: source[i]['Dosage'],
                ingredient: source[i]['Ingredients'],
                stock: source[i]['Stock'],
                quantity: source[i]['Quantity'],
                price: source[i]['Price'],
                image: source[i]['Image'],
                description: source[i]['Description'],
                category: source[i]['High Dose'],
                agent: source[i]['Agent'],
                country: source[i]['Country'],
                laboratory: source[i]['Laboratory'],
                code: source[i]['Code'],
                pharmaId: req.body.pharmaId
            };
            arrayToInsert.push(oneRow);
        }
        console.log("csvvv", arrayToInsert)
        // inserting into the table Product
        Product.insertMany(arrayToInsert, (err, result) => {
            if (err) console.log(err);
            if (result) {
                console.log('Import CSV into database successfully.');
            }
        });
    });
    
}

export const deleteProduct = async(req, res) => {
    try {
        const deleteprod = await Product.findByIdAndDelete(req.params.id);

        return res.json({success: true, message: 'Product deleted successfully'})
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}