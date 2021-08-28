import { Product } from '../model/product';
import express from 'express';
const productRouters = express.Router();


productRouters.get(`/`, async (req, res) => {
    const productList = await Product.find();
    res.send(productList);
})

productRouters.post(`/`, (req, res) => {
    const newProduct = req.body;
    const product = new Product({
        name: newProduct.name,
        image: newProduct.image,
        countInStock: newProduct.countInStock,
    });

    product.save().then((createdProduct => {
        res.status(201).json(createdProduct);
    })).catch((error) => {
        res.status(500).json({
            error: error,
            success: false
        });
    });
})

export default productRouters;