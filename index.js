import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import cartRoutes from './routes/cart.routes.js'
import messagesRoutes from './routes/messages.routes.js'
import productsRoutes from './routes/products.routes.js'

import { dbConection } from './database/dbConection.js'

dotenv.config()

const api = express()

dbConection()

api.use(cors())
api.use(express.json())

api.use('/api/cart', cartRoutes)
api.use('/api/message', messagesRoutes)
api.use('/api/products', productsRoutes)


api.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})