// Función para manejar el evento de hacer clic en el botón "Agregar al Carrito"
async function handleAddToCart(event) {
    if (!event.target.classList.contains('cart-btn')) {
        return;
    }

    const productId = event.target.getAttribute('data-product-id');

    try {
        const response = await fetch("http://localhost:8080/api/cart/add", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productId })
        });

        if (!response.ok) {
            throw new Error('Error al agregar el producto al carrito');
        }

        const data = await response.json();
        console.log('Producto agregado al carrito:', data);
    } catch (error) {
        console.error('Error al agregar el producto al carrito:', error);
    }
}

// Agregar un event listener para el evento click en el contenedor productList
document.getElementById('productList').addEventListener('click', handleAddToCart);

// Función para manejar el envío del formulario para agregar un producto
document.getElementById('addProductForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    // Obtener los valores del formulario
    const formData = new FormData(event.target);

    try {
        const response = await fetch('http://localhost:8080/api/products/addProduct', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Error al agregar el producto');
        }

        const data = await response.json();
        console.log('Producto agregado:', data);

        // Limpiar el formulario después de agregar el producto
        event.target.reset();

    } catch (error) {
        console.error('Error al agregar el producto:', error);
    }
});

// Función para manejar el evento de hacer clic en el botón "Eliminar Producto"
async function handleDeleteProduct(event) {
    if (!event.target.classList.contains('delete-btn')) {
        return;
    }

    const productId = event.target.getAttribute('data-product-id');

    try {
        const response = await fetch(`http://localhost:8080/api/products/deleteProduct/${productId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Error al eliminar el producto');
        }

        // Eliminar el producto de la interfaz
        const productElement = event.target.closest('.col-md-4');
        if (productElement) {
            productElement.remove();
            console.log(`Producto con ID ${productId} eliminado`);
        } else {
            console.log(`No se encontró el producto con ID ${productId}`);
        }

    } catch (error) {
        console.error('Error al eliminar el producto:', error);
    }
}

// Agregar un event listener para el evento click en el contenedor productList
document.getElementById('productList').addEventListener('click', handleDeleteProduct);