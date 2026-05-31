import express from "express";
import { createCart, getCarts } from "../controllers/cart.controller.js";

const router = express.Router()

router
    .get("/", getCarts)
    .post("/", createCart)

export default router