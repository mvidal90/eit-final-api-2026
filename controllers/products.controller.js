import fs from "fs"
import { Image } from "../models/Image.js";
import { Products } from "../models/Product.js";

export const getProducts = async (req, res) => {

    const { limit = "10", pageNumber = "1" } = req.query

    const limitParsed = parseInt(limit)
    const pageNumberParsed = parseInt(pageNumber)

    try {
        const findQuery = { deletedAt: null }
        const productsCount = await Products.countDocuments(findQuery)

        const products = await Products.find(findQuery)
                                        .skip(pageNumberParsed > 1 ? (pageNumberParsed - 1) * limitParsed : 0)
                                        .limit(limitParsed)


        const productsWithMongoImage = products.map(({_doc}) => ({
            ..._doc,
            image: _doc.image.startsWith("http") ? _doc.image : `${process.env.API_BASE_URL}${_doc.image}`
        }))

        res.json({
            ok: true,
            msg: "Productos obtenidos correctamente",
            products: productsWithMongoImage,
            total: productsCount,
            totalPages: Math.ceil(productsCount / limitParsed), // Math.ceil para redondear hacia arriba SIEMPRE, ya que aunque haya 11 productos y el límite sea 10, se necesitan 2 páginas para mostrar todos los productos.
            pageNumber: pageNumberParsed
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error del servidor. Al obtener la lista de productos, por favor intenta más tarde."
        })
    }
}

export const getProductById = async (req, res) => {
    const { id } = req.params
    
    try {
        const product = await Products.findOne({ _id: id, deletedAt: null })

        if (!product) {
            return res.status(404).json({
                ok: false,
                msg: "Producto no encontrado"
            })
        }

        res.json({
            ok: true,
            msg: "Producto obtenido correctamente",
            product
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error del servidor. Al obtener el producto, por favor intenta más tarde."
        })
    }
}
export const createProduct = async (req, res) => {
    const data = req.body
    const file = req.file

    try {

        if (!file) {
            return res.status(400).json({
                ok: false,
                msg: "La imagen del producto es obligatoria"
            })
        }

        const imageBuffer = fs.readFileSync("./" + file.path)

        const image = await Image.create({
            fileName: file.filename,
            imageContent: {
                data: imageBuffer,
                contentType: "image/png"
            }
        })

        const newProduct = await Products.create({
            ...data,
            image: `/image/${image._id}`
        })

        fs.rm("./" + file.path, error => {
            if (error) {
                console.error("Error al eliminar la imagen temporal:", error)
            } else {
                console.log("Imagen temporal eliminada correctamente")
            }       
        })

        res.status(201).json({
            ok: true,
            msg: "Producto creado correctamente",
            product: newProduct
        })
    } catch (error) {
        console.error("Error al crear el producto:", error)
        res.status(500).json({
            ok: false,
            msg: "Error del servidor. Al crear el producto, por favor intenta más tarde."
        })
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params
    const data = req.body

    try {
        const foundProduct = await Products.findOne({ _id: id, deletedAt: null })

        if (!foundProduct) {
            return res.status(404).json({
                ok: false,
                msg: "Producto no encontrado"
            })
        }

        const updatedProduct = await Products.findByIdAndUpdate(id, data, { returnDocument: "after" })

        res.json({
            ok: true,
            msg: "Producto actualizado correctamente",
            product: updatedProduct
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error del servidor. Al actualizar el producto, por favor intenta más tarde."
        })
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params

    try {
        const foundProduct = await Products.findOne({ _id: id, deletedAt: null })

        if (!foundProduct) {
            return res.status(404).json({
                ok: false,
                msg: "Producto no encontrado"
            })
        }

        await Products.findByIdAndUpdate(id, { deletedAt: new Date() })

        res.json({
            ok: true,
            msg: "Producto eliminado correctamente"
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error del servidor. Al eliminar el producto, por favor intenta más tarde."
        })
    }
}