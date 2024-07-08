import {response} from "express";
import Product from "../models/product.js";

const getProducts = async (req, res = response) => {

    const {limit = 5, page = 0} = req.query;

    const [products, total] = await Promise.all([
        Product.find().skip(Number(page)).limit(Number(limit)),
        Product.countDocuments()]);

    res.json({
        total,
        list: products
    });
}

const createProduct = async (req, res = response) => {

    const productName = req.body.name.toUpperCase();

    const isExist = await Product.findOne({name: productName});
    if (isExist) {
        return res.status(400).json({
            msg: `product ${productName} already exist`
        });
    }

    const data = {
        name: productName,
        price: req.body.price,
        img: req.body.img
    }

    const product = new Product(data);
    await product.save();

    res.status(201).json({
        product
    });
}

export {
    getProducts,
    createProduct
}