let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const containerCarrito = document.getElementById("containerCarrito");

function pintarCarrito(array) {
    containerCarrito.innerHTML = "";
    array.forEach(e => {
        const article = document.createElement("article");
        article.className = "container col-3 card mod m-3 d-flex";
        article.innerHTML = `
        <div class="mt-2 mb-2">
            <img class="img-fluid" src="${e.urlImg}" alt="Foto del producto principal">
            <h3>${e.nombre}</h3>
            <p>$ ${e.precio}</p>
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
    <button id="btn-Comprar"class="btn-compra btn">Comprar</button>
    <button class="btn-eliminar btn">Eliminar Todo</button>
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
btnComprar.addEventListener("click",comprarTodo);

function calcularValor(array){
let sumatoria = 0;
let cantidad = 0;
let total = 0;
array.forEach ( e =>{
cantidad = e.cantidad;
total = e.precio*cantidad
sumatoria +=total;
});
return sumatoria;
}


function comprarTodo(){
    if (carrito !== 0){
    const totalCompra = calcularValor(carrito)
    alert("Se han comprado todos los productos ingresados en el carrito por un valor de: $ " + totalCompra)
    } else {
        alert("El carrito esta vacio")
    }
    carrito = [];
    pintarCarrito(carrito);
    localStorage.setItem("carrito",JSON.stringify(carrito));
}