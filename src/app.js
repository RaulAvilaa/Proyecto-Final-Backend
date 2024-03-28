import express from "express";
import { connectMongoDB } from "./config/config.db.js";
import http from "http";
import exphbs from "express-handlebars"; // Cambié handlebars a exphbs
import bodyParser from "body-parser";
import path from "path";
import router from "./routes/routes.js";
import __dirname from "./util.js";
import { productRouter } from './routes/product.router.js';
import cartRouter from './routes/cart.router.js';
import ProductManager from './dao/managers/productManager.js'

const PORT = 8080;
const app = express();
const httpServer = http.createServer(app);
const productManager = new ProductManager();

// Middleware para analizar el cuerpo de la solicitud JSON
app.use(express.json());

// Middleware adicional para analizar el cuerpo de la solicitud JSON en cartRouter
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

/// Middleware para utilizar plantillas html
app.engine("handlebars", exphbs.engine()); // Utiliza un objeto de opciones vacío
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");
app.use(express.static(path.join(__dirname, 'public'), {
    setHeaders: (res, path, stat) => {
        if (path.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        }
    }
}));

// Rutas
app.use("/api/", router);
app.use('/api/products/', productRouter);
app.use('/api/carts/', cartRouter);

// Servidor HTTP
httpServer.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Llama a la función connectMongoDB para conectar a la base de datos
connectMongoDB();

export { productManager };