import { Messages } from "../models/Messages.js"

export const createMessage = async (req, res) => {
    try {
        const newMessage = await Messages.create(req.body)

        res.status(201).json({
            ok: true,
            msg: "Mensaje creado correctamente",
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error del servidor. Al crear el mensaje, por favor intenta más tarde."
        }) 
    }
}