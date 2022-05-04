import Product from "../models/product.js";

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