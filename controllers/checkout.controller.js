import { MercadoPagoConfig, Preference } from "mercadopago"


export const createpreferenceMP = async (req, res) => {
    const { body } = req
    try {
        const client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN_MP })
        const preference = new Preference(client)

        const response = await preference.create({
            body: {
                ...body
            }
        })

        res.status(201).json({
            ok: true,
            preferenceId: response.id
        })


    } catch (error) {
        console.error("Error al crear la preferencia de pago:", error)
        res.status(500).json({
            ok: false,
            msg: "Error del servidor. Al crear la preferencia de pago, por favor intenta más tarde."
        })
    }

}