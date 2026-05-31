import { Cart } from "../models/Cart.js"

export const getCarts = async (req, res) => {
    try {
        const carts = await Cart.find()
                                .populate("cartItems.productId")

        res.json({
            ok: true,
            msg: "Carritos obtenidos correctamente",
            carts
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error del servidor. Al obtener los carritos, por favor intenta más tarde."  
        })
    }
}

export const createCart = async (req, res) => {
    try {
        const newCart = await Cart.create(req.body)

        res.status(201).json({
            ok: true,
            msg: "Carrito creado correctamente",
            cart: newCart
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error del servidor. Al crear el carrito, por favor intenta más tarde."
        })
    }
}