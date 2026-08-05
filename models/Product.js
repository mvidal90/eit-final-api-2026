import { model, Schema } from "mongoose";

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    shortDescription: {
        type: String,
        required: true
    },
    longDescription: {
        type: String,
    },
    freeDelivery: {
        type: Boolean,
        default: false
    },
    ageFrom: {
        type: Number,
    },
    ageTo: {
        type: Number,
    },
    image: {
        type: String,
        required: true
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, { timestamps: true })

export const Products = model("Product", ProductSchema)