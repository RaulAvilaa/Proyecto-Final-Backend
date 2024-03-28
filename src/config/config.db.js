import mongoose from "mongoose";

export async function connectMongoDB() {
    const stringConnection = "mongodb://127.0.0.1:27017/ecommerce?retryWrites=true&w=majority";
    try {
        await mongoose.connect(stringConnection);
        console.log("Conectado con éxito a MongoDB usando Mongoose.");
    } catch (error) {
        console.error("No se pudo conectar a la BD usando Mongoose:", error);
        process.exit(1); // Termina el proceso con un código de error
    }
};