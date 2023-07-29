let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const containerCarrito = document.getElementById("containerCarrito");

function obtenerValorDolarDesdeAPI() {
    return fetch('https://criptoya.com/api/dolar')
        .then(response => response.json())
        .then(data => data.oficial)
        .catch(error => {
            console.error('Error al obtener el valor del dólar:', error);
            return null;
        });
}

function convertirPesosADolares(valorEnPesos) {
    return obtenerValorDolarDesdeAPI().then(valorDolar => {
        if (valorDolar !== null) {
            const valorEnDolares = (valorEnPesos / valorDolar).toFixed(2);
            return valorEnDolares;
        } else {
            console.error('No se pudo obtener el valor del dólar desde la API.');
            return null;
        }
    });
}

function pintarCarrito(array) {
    containerCarrito.innerHTML = "";
    array.forEach(e => {
        const article = document.createElement("article");
        article.className = "container col-3 card mod m-3 d-flex";
        article.innerHTML = `
        <div class="mt-2 mb-2">
            <img class="img-fluid" src="${e.urlImg}" alt="Foto del producto principal">
            <h3>${e.nombre}</h3>
            <p>$${e.precio * e.cantidad}</p>
            <p>Cantidad: ${e.cantidad}</p>
            <input type="button" value="Eliminar" class="btn btn-personalizado btnEliminar" data-id="${e.id}">
        </div>
        `;

        containerCarrito.appendChild(article);
    });

    const btnEliminar = document.getElementsByClassName("btnEliminar");
    for (let i = 0; i < btnEliminar.length; i++) {
        btnEliminar[i].addEventListener("click", eliminarProducto);
    }
}

pintarCarrito(carrito);

const containerBtn = document.getElementById("containerBtn");

if (carrito.length !== 0) {
    containerBtn.innerHTML = "";
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

function eliminarProducto(event) {
    const productoId = parseInt(event.target.getAttribute("data-id"));
    carrito = carrito.filter(producto => producto.id !== productoId);
    pintarCarrito(carrito);
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function eliminarTodo() {
    carrito = [];
    pintarCarrito(carrito);
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

const btnComprar = document.getElementById("btn-Comprar");
btnComprar.addEventListener("click", comprarTodo);

function calcularValor(array) {
    let sumatoria = 0;
    let cantidad = 0;
    let total = 0;
    array.forEach(e => {
        cantidad = e.cantidad;
        total = e.precio * cantidad
        sumatoria += total;
    });
    return sumatoria;
}

function comprarTodo() {
    if (carrito.length !== 0) {
        const totalCompra = calcularValor(carrito);
        convertirPesosADolares(totalCompra)
            .then(valorEnDolares => {
                if (valorEnDolares !== null) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Se ha completado la compra correctamente!',
                        text: 'El monto pagado fue de $' + totalCompra + '\n . Su valor en dólares es de: $' + valorEnDolares,

                    });
                } else {
                    console.error('No se pudo realizar la conversión a dólares.');
                }
            });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'El carrito esta vacio',
        });
    }
    carrito = [];
    pintarCarrito(carrito);
    localStorage.setItem("carrito", JSON.stringify(carrito));
}
