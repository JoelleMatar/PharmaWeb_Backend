import Product from "../models/product.js";
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

        const products = await Product.find({pharmaId: req.params.id});

        return res.json({ data: products });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getSearchedProductsSuggestions = async (req, res) => {
    console.log("req.params.search", req.params.search);
    try {

        const products = await Product.find({productName: req.params.search});
        const pharmaIds = products.map(product => product.pharmaId);
        
        const pharmacies = await User.find({_id: pharmaIds})

        return res.json({ data: {products, pharmacies} });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getProductsbySearch = async (req, res) => {
    const search = req.params.search;
    const pharmaId = req.params.id;
    try {

        const products = await Product.find({pharmaId: pharmaId, productName: {$regex: search, $options: 'i'}});

        return res.json({ data: products });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPharmacyProductsbySearch = async (req, res) => {
    const search = req.params.search;
    const pharmaId = req.params.id;
    try {

        const products = await Product.find({pharmaId: pharmaId, productName: {$regex: search, $options: 'i'}});

        return res.json({ data: products });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}