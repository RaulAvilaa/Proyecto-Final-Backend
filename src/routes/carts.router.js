import { Router } from "express";
import { CartManager } from "../cartManager.js";  // Ajusta la importación según la ubicación real de CartManager

const cartsRouter = Router();

// Ajusta la ruta del archivo cart.json
const cartManager = new CartManager('./src/data/cart.json');

cartsRouter.post('/', async (req, res) => {
    try {
        const response = await cartManager.newCart();
        res.json(response);
    } catch (error) {
        console.error('Error al crear carrito:', error);
        res.status(500).json({ error: 'Error al crear carrito' });
    }
});

cartsRouter.get('/:cid', async (req, res) => {
    const { cid } = req.params;
    try {
        const response = await cartManager.getCartProducts(cid);
        res.json(response);
    } catch (error) {
        console.error('Error al intentar enviar los productos del carrito:', error);
        res.status(500).json({ error: 'Error al intentar enviar los productos del carrito' });
    }
});

cartsRouter.post('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    try {
        await cartManager.addProductToCart(cid, pid);
        res.send('Producto agregado correctamente');
    } catch (error) {
        console.error('Error al intentar guardar producto en el carrito:', error);
        res.status(500).json({ error: 'Error al intentar guardar producto en el carrito' });
    }
});

export { cartsRouter };