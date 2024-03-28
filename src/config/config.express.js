import mongoose from "mongoose";

const connectMongoDB = async () => {
    const stringConnection = "mongodb://localhost:27017/ecommerce-web-coder";
    try {
        await mongoose.connect(stringConnection, {
            keepAlive: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Conectado con éxito a MongoDB usando Mongoose.");
    } catch (error) {
        console.error("No se pudo conectar a la BD usando Mongoose: " + error);
        process.exit(1);
    }
};

export { connectMongoDB };