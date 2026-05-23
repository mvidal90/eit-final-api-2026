import mongoose from "mongoose";

export const dbConection = async () => {
    try {
        const mongoDB = await mongoose.connect(process.env.BASE_URL_DB);
        console.log(`Database connected: ${mongoDB.connections[0].name}`);
    } catch (error) {
        console.log(`Error connecting to database: ${error}`);
    }
}