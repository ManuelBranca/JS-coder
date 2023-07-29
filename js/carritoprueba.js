// Variables globales
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const containerCarrito = document.getElementById("containerCarrito");

// Función para obtener el valor actual del dólar en pesos desde la API de Criptoya
function obtenerValorDolar() {
    return fetch('https://criptoya.com/api/dolar')
        .then(response => response.json())
        .then(data => data.precio)
        .catch(error => {
            console.error('Error al obtener el valor del dólar:', error);
            return null;
        });
}

// Función para pintar el contenido del carrito en la página con los precios en dólares
function pintarCarrito(array) {
    containerCarrito.innerHTML = "";

    obtenerValorDolar().then(valorDolar => {
        array.forEach(e => {
            const article = document.createElement("article");
            article.className = "container col-3 card mod m-3 d-flex";
            const precioEnDolares = (e.precio * valorDolar).toFixed(2);

            article.innerHTML = `
        <div class="mt-2 mb-2">
            <img class="img-fluid" src="${e.urlImg}" alt="Foto del producto principal">
            <h3>${e.nombre}</h3>
            <p>Precio: $${e.precio}</p>
            <p>Precio en dólares: $${precioEnDolares}</p>
            <p>Cantidad: ${e.cantidad}</p>
            <input type="button" value="Eliminar" class="btn btn-personalizado btnEliminar" data-id="${e.id}">
        </div>
        `;
            containerCarrito.appendChild(article);
        });
    });

    const btnEliminar = document.getElementsByClassName("btnEliminar");
    for (let i = 0; i < btnEliminar.length; i++) {
        btnEliminar[i].addEventListener("click", eliminarProducto);
    }
}

// Función para actualizar el carrito con los precios en dólares
function actualizarCarrito() {
    obtenerValorDolar().then(valorDolar => {
        const carritoConPreciosEnDolares = carrito.map(producto => ({
            ...producto,
            precioEnDolares: (producto.precio * valorDolar).toFixed(2),
        }));
        pintarCarrito(carritoConPreciosEnDolares);
        localStorage.setItem("carrito", JSON.stringify(carritoConPreciosEnDolares));
    });
}

// Función para eliminar un producto del carrito
function eliminarProducto(event) {
    const productoId = parseInt(event.target.getAttribute("data-id"));
    carrito = carrito.filter(producto => producto.id !== productoId);
    pintarCarrito(carrito);
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Función para eliminar todo el carrito
function eliminarTodo() {
    carrito = [];
    pintarCarrito(carrito);
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Resto del código...

// Función para calcular el valor total de los productos en el carrito
function calcularValor(array) {
    let sumatoria = 0;
    array.forEach(e => {
        sumatoria += e.precio * e.cantidad;
    });
    return sumatoria;
}

// Función para comprar todos los productos del carrito
function comprarTodo() {
    if (carrito.length !== 0) {
        const totalCompra = calcularValor(carrito);
        obtenerValorDolar().then(valorDolar => {
            const totalCompraEnDolares = (totalCompra * valorDolar).toFixed(2);
            Swal.fire(
                'Se ha completado la compra correctamente!',
                `El monto pagado fue de $${totalCompra} o $${totalCompraEnDolares} en dólares.`,
                'success'
            );
            carrito = [];
            pintarCarrito(carrito);
            localStorage.setItem("carrito", JSON.stringify(carrito));
        });
    } else {
        alert("El carrito está vacío");
    }
}


// Agregar botones Comprar y Eliminar Todo al contenedor correspondiente
if (carrito.length !== 0) {
    const buttonContainer = document.createElement("div");
    buttonContainer.className = "container gap-5 d-flex justify-content-center";
    buttonContainer.innerHTML = `
    <button id="btn-Comprar" class="btn-compra btn mt-1">Comprar</button>
    <button class="btn-eliminar btn mt-1">Eliminar Todo</button>
    `;
    containerBtn.appendChild(buttonContainer);

    const btnEliminarTodo = document.querySelector(".btn-eliminar");
    btnEliminarTodo.addEventListener("click", eliminarTodo);
}

// Evento para comprar todos los productos del carrito
const btnComprar = document.getElementById("btn-Comprar");
btnComprar.addEventListener("click", comprarTodo);

// Llamamos a la función para actualizar el carrito con los precios en dólares
actualizarCarrito();


