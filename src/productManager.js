import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';

export class ProductManager {
    constructor(filePath = './src/data/products.json') {
        this.path = filePath;
        this.products = [];
    }

    async addProduct({ title, description, price, thumbnail, code, stock, status, category }) {
        try {
            const id = uuidv4();
            const newProduct = { id, title, description, price, thumbnail, code, stock, status, category };

            this.products = await this.getProducts();
            this.products.push(newProduct);

            await this.writeProducts();
            return newProduct;
        } catch (error) {
            console.error('Error al intentar agregar el producto:', error);
            throw new Error('Error al intentar agregar el producto');
        }
    }

    async getProducts() {
        try {
            const response = await fs.readFile(this.path, 'utf8');
            const responseJSON = JSON.parse(response);
            return responseJSON;
        } catch (error) {
            console.error(`Error al leer el archivo de productos: ${error.message}`);
            throw new Error('Error al leer el archivo de productos');
        }
    }

    async getProductsById(id) {
        try {
            const products = await this.getProducts();
            const product = products.find(product => product.id === id);

            if (product) {
                return product;
            } else {
                console.error('Producto no encontrado');
                throw new Error('Producto no encontrado');
            }
        } catch (error) {
            console.error(`Error al intentar recibir el producto con ID ${id}:`, error);
            throw new Error(`Error al intentar recibir el producto con ID ${id}`);
        }
    }

    async updateProduct(id, { title, description, price, thumbnail, code, stock, status, category }) {
        try {
            const products = await this.getProducts();
            const index = products.findIndex(product => product.id === id);

            if (index !== -1) {
                products[index] = { id, title, description, price, thumbnail, code, stock, status, category };
                await this.writeProducts(products);
                return products[index];
            } else {
                console.error('Producto no encontrado');
                throw new Error('Producto no encontrado');
            }
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
            throw new Error('Error al actualizar el producto');
        }
    }

    deleteProduct = async (id) => {
        try {
            const products = await this.getProducts();
            const index = products.findIndex(product => product.id === id);

            if (index !== -1) {
                products.splice(index, 1);
                await this.writeProducts(products); 
            } else {
                console.error('Producto no encontrado');
                throw new Error('Producto no encontrado');
            }
        } catch (error) {
            console.error(`Error al intentar eliminar el producto con ID ${id}:`, error);
            throw new Error(`Error al intentar eliminar el producto con ID ${id}`);
        }
    }

    async writeProducts() {
        try {
            await fs.writeFile(this.path, JSON.stringify(this.products));
        } catch (error) {
            console.error('Error al escribir en el archivo de productos:', error);
            throw new Error('Error al escribir en el archivo de productos');
        }
    }
}