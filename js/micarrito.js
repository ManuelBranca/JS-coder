const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const containerCarrito = document.getElementById("containerCarrito");

function pintarCarrtio(array){
    containerCarrito.innerHTML= "";
    array.forEach(e => {
        const article = document.createElement("article")
        article.className= "container col-3 card mod m-3 d-flex"
        article.innerHTML=`
        <div class="mt-2 mb-2">
            <img class="img-fluid" src="${e.urlImg}" alt="Foto del producto principal">
            <h3>${e.nombre}</h3>
            <p>$ ${e.precio}</p>
            <input type="button" value="Eliminar" class="btn btn-personalizado" >
        </div>
        `

        containerCarrito.appendChild(article)
    });
}
pintarCarrtio(carrito);