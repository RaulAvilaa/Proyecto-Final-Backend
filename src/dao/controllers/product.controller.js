import mongoose from "mongoose";
import Product from "../models/product.model.js";

const productController = {
    getProducts: async (req, res) => {
        const { category, brand, sort } = req.query;
        const currentPage = req.query.page || 1;
        const limit = parseInt(req.query.limit) || 10; // Se establece un límite predeterminado

        try {
            let query = {};

            if (category) {
                query.category = category;
            }

            if (brand) {
                query.brand = brand;
            }

            const options = {
                limit: limit,
                page: currentPage,
                sort: { price: sort === 'asc' ? 1 : -1 }
            };

            const filter = await Product.paginate(query, options);
            const products = filter.docs.map(product => product.toObject());

            if (req.accepts('html')) {
                return res.render('realTimeProducts', { Products: products, Query: filter });
            }

            res.json({ Products: products, Query: filter });
        } catch (err) {
            console.error('Error:', err);
            return res.status(500).json({ error: "Error en la base de datos", details: err.message });
        }
    },

    getProductDetail: async (req, res) => {
        const productId = req.params.pid; // Cambia req.params.id a req.params.pid
    
        try {
            const productDetail = await Product.findOne({ _id: productId }).lean();
    
            if (req.accepts('html')) {
                return res.render('product', { Product: productDetail });
            }
    
            res.json(productDetail);
        } catch (error) {
            console.error("Error al ver los detalles:", error);
            return res.status(500).json({ error: "Error en la base de datos", details: error.message });
        }
    },

    addProduct: async (req, res) => {
        const { title, brand, description, price, stock, category } = req.body;

        try {
            const imageName = req.file ? req.file.filename : null;

            if (!imageName) {
                return res.status(400).json({ error: 'No se proporcionó una imagen válida' });
            }

            const newProduct = await Product.create({
                title,
                brand,
                description,
                price,
                stock,
                category,
                image: imageName,
            });

            return res.json({
                message: "Producto creado!!!",
                Product: newProduct,
            });
        } catch (error) {
            console.error("Error al guardar el Producto:", error);
            return res.status(500).json({ error: "Error en la base de datos", details: error.message });
        }
    },

    deleteProduct: async (req, res) => {
        const productId = req.params.id;

        try {
            const deleteProduct = await Product.findByIdAndDelete(productId);

            if (!deleteProduct) {
                return res.status(404).json({ error: "Producto no encontrado" });
            }

            const products = await Product.find();
            return res.json({ message: "Producto eliminado!", listProduct: products });
        } catch (error) {
            console.error('Error al borrar el producto:', error);
            return res.status(500).json({ error: "Error en la base de datos", details: error.message });
        }
    }
}

export default productController;