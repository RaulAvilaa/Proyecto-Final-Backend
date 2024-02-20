import { Router } from "express";
import { productManager } from "../app.js";

const productsRouter = Router();

// Obtener todos los productos o limitar por cantidad
productsRouter.get('/', async (req, res) => {
    try {
        const { limit } = req.query;
        const products = await productManager.getProducts();

        if (limit) {
            const limitedProducts = products.slice(0, limit);
            return res.json(limitedProducts);
        }

        return res.json(products);

    } catch (error) {
        console.error('Error al intentar recibir los productos:', error);
        res.status(500).send('Error al intentar recibir los productos');
    }
});

// Obtener un producto por ID
productsRouter.get('/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        const product = await productManager.getProductsById(pid);
        res.json(product);
    } catch (error) {
        console.error(`Error al intentar recibir el producto con ID ${pid}:`, error);
        res.status(500).send(`Error al intentar recibir el producto con ID ${pid}`);
    }
});

// Agregar un nuevo producto
productsRouter.post('/', async (req, res) => {
    try {
        const { title, description, price, thumbnail, code, stock, status = true, category } = req.body;
        const response = await productManager.addProduct({ title, description, price, thumbnail, code, stock, status, category });
        res.json(response);

    } catch (error) {
        console.error('Error al intentar agregar el producto:', error);
        res.status(500).send('Error al intentar agregar el producto');
    }
});

// Actualizar un producto existente por ID
productsRouter.put('/:pid', async (req, res) => {
    const { pid } = req.params;

    try {
        const { title, description, price, thumbnail, code, stock, status = true, category } = req.body;
        const response = await productManager.updateProduct(pid, { title, description, price, thumbnail, code, stock, status, category });
        res.json(response);

    } catch (error) {
        console.error(`Error al intentar actualizar el producto con ID ${pid}:`, error);
        res.status(500).send(`Error al intentar actualizar el producto con ID ${pid}`);
    }
});

// Eliminar un producto por ID
productsRouter.delete('/:pid', async (req, res) => {
    const { pid } = req.params;

    try {
        await productManager.deleteProduct(pid);
        res.send(`Producto eliminado correctamente`);
    } catch (error) {
        console.error(`Error al intentar eliminar el producto con ID ${pid}:`, error);
        res.status(500).send(`Error al intentar eliminar el producto con ID ${pid}`);
    }
});

export { productsRouter };