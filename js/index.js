const productos = [
    {
        cantidad: 0,
        id: 1,
        nombre: "574 - New Balance",
        precio: 33000,
        urlImg: "../img/new-balance.jpg"
    },
    {
        cantidad: 0,
        id: 2,
        nombre: "Air Max - Nike",
        precio: 40000,
        urlImg: "../img/airmax-nike.jpg"
    },
    {
        cantidad: 0,
        id: 3,
        nombre: "Galaxy 6 - Adidas",
        precio: 29000,
        urlImg: "../img/galaxy6-adidas.jpg"
    }]

const productos2 = [
    {
        cantidad: 0,
        id: 4,
        nombre: "Xray 2 - Puma",
        precio: 25000,
        urlImg: "../img/puma-xray2.jpg"
    },
    {
        cantidad: 0,
        id: 5,
        nombre: "Superstar Clasicas - Adidas",
        precio: 27000,
        urlImg: "../img/superstar-clasicas.jpg"
    },
    {
        cantidad: 0,
        id: 6,
        nombre: "Urbana de Cuero - Dino Butelli",
        precio: 32000,
        urlImg: "../img/urbanadecuero-dinobutelli.jpg"
    }
]
const ArrayDeProductos = [...productos, ...productos2];
console.log(ArrayDeProductos);

localStorage.setItem("productos", JSON.stringify(productos))
console.log(productos)

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const containerProductos = document.getElementById("containerProductos");

function mostrarProductos(array) {
    containerProductos.innerHTML = "";
    array.forEach(e => {
        const article = document.createElement("article");
        article.className = "container col-3 card mod m-3";
        article.innerHTML = `
            <div class="mt-2 mb-2">
                <img class="img-fluid" src="${e.urlImg}" alt="Foto del producto principal">
                <h3>${e.nombre}</h3>
                <p>$${e.precio}</p>
                <input type="button" value="Agregar al Carrito" class="btn btn-personalizado" id="${e.id}">
            </div>
        `;
        containerProductos.appendChild(article);

        document.getElementById(e.id).addEventListener("click", (event) => {
            if (carrito.some(el => el.id == e.id)) {
                carrito.find(p => p.id == e.id).cantidad++;
            } else {
                carrito.push({ ...e, cantidad: 1 });
            }
            localStorage.setItem("carrito", JSON.stringify(carrito));

            Swal.fire({
                position: 'top-end', 
                icon: 'success',
                title: 'Producto agregado al carrito correctamente',
                showConfirmButton: false,
                timer: 700 
            });
        });
    });
}

mostrarProductos(ArrayDeProductos);

localStorage.setItem("carrito2", JSON.stringify(productos2))
console.log(productos2)


localStorage.setItem("arrayCarrito", JSON.stringify(ArrayDeProductos))

