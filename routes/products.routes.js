import express from "express";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/products.controller.js";

const router = express.Router()

router
    .get('/', getProducts)
    .get('/byId/:id', getProductById)
    .post('/', createProduct)
    .put('/:id', updateProduct)
    .delete('/:id', deleteProduct)

export default router