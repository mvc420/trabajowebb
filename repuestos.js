let carrito = [];

// Función para agregar productos al carrito
function agregarAlCarrito(nombre, precio, imagen) {
    carrito.push({ nombre, precio, imagen });
    actualizarCarrito();
}

// Función para actualizar el contenido del carrito
function actualizarCarrito() {
    const carritoIcono = document.getElementById('carrito');
    let carritoContainer = document.getElementById('carrito-contenido');

    // Si no existe el contenedor del carrito, lo creamos dentro del icono
    if (!carritoContainer) {
        carritoContainer = document.createElement('div');
        carritoContainer.id = 'carrito-contenido';
        carritoContainer.style.position = 'absolute';
        carritoContainer.style.top = '50%';
        carritoContainer.style.left = '50%';
        carritoContainer.style.transform = 'translate(-50%, -50%)';
        carritoContainer.style.background = '#fff';
        carritoContainer.style.border = '1px solid #ddd';
        carritoContainer.style.padding = '10px';
        carritoContainer.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
        carritoContainer.style.zIndex = '10';
        carritoContainer.style.width = '200px';
        carritoContainer.style.display = 'none';
        carritoContainer.style.overflowY = 'auto';
        carritoContainer.style.maxHeight = '300px';
        carritoContainer.style.borderRadius = '10px';
        carritoIcono.parentElement.appendChild(carritoContainer);
    }

    carritoContainer.innerHTML = ''; // Limpiamos el contenido anterior

    if (carrito.length === 0) {
        carritoContainer.innerHTML = '<p>El carrito está vacío</p>';
    } else {
        carrito.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('carrito-item');
            itemElement.style.display = 'flex';
            itemElement.style.alignItems = 'center';
            itemElement.style.justifyContent = 'space-between';
            itemElement.style.marginBottom = '5px';

            itemElement.innerHTML = `
                <img src="${item.imagen}" alt="${item.nombre}" style="width: 40px; height: 40px; object-fit: cover; margin-right: 5px; border-radius: 5px;">
                <span>${item.nombre}</span>
                <span style="font-weight: bold; margin-left: 5px;">${item.precio}</span>
                <button style="background: red; color: white; border: none; padding: 5px; cursor: pointer; border-radius: 5px;" onclick="eliminarDelCarrito(${index})">X</button>
            `;

            carritoContainer.appendChild(itemElement);
        });

        const total = carrito.reduce((acc, item) => acc + parseFloat(item.precio.replace(/[^0-9.-]+/g, '')), 0);
        const totalElement = document.createElement('div');
        totalElement.textContent = `Total: $${total.toFixed(2)}`;
        totalElement.style.fontWeight = 'bold';
        totalElement.style.marginTop = '10px';
        totalElement.style.textAlign = 'center';
        carritoContainer.appendChild(totalElement);
    }

    // Contador visual sobre el icono del carrito
    let contador = document.querySelector('#carrito-contador');
    if (!contador) {
        contador = document.createElement('span');
        contador.id = 'carrito-contador';
        contador.style.position = 'absolute';
        contador.style.top = '0';
        contador.style.right = '0';
        contador.style.background = 'red';
        contador.style.color = 'white';
        contador.style.padding = '3px 6px';
        contador.style.borderRadius = '50%';
        contador.style.fontSize = '12px';
        carritoIcono.parentElement.appendChild(contador);
    }
    contador.textContent = carrito.length;
}

// Eliminar producto del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

// Capturamos los productos y les añadimos eventos
const productos = document.querySelectorAll('#card');
productos.forEach(producto => {
    const nombre = producto.querySelector('#titulo').textContent;
    const precio = producto.querySelector('#precio').textContent;
    const imagen = producto.querySelector('#imagen').src;

    producto.querySelector('#button').addEventListener('click', () => {
        agregarAlCarrito(nombre, precio, imagen);
    });
});

// Hacemos que el carrito se despliegue al hacer clic en el ícono
const carritoIcono = document.getElementById('carrito');
carritoIcono.addEventListener('click', () => {
    const carritoContainer = document.getElementById('carrito-contenido');
    carritoContainer.style.display = carritoContainer.style.display === 'none' ? 'block' : 'none';
});
