// lista de todos los contenedores de productos
const listaContenedores = document.querySelector('.seccionProductos')

let arrayDeProductos = [];

// agarro info del producto
listaContenedores.addEventListener('click', e => {
    if (e.target.classList.contains('btn')) {
        const productos = (e.target.parentElement);

        const infoProducto = {
            cantidad: 1,
            nombre: productos.querySelector('h3').textContent,
            precio: productos.querySelector('p').textContent,
            url: productos.querySelector('img').src
        }

        const existe = arrayDeProductos.some(productos => productos.nombre === infoProducto.nombre)

        if (existe) {
            const producto = arrayDeProductos.map(productos => {
                if (productos.nombre === infoProducto.nombre) {
                    productos.cantidad++;
                    return productos;
                } else {
                    return productos;
                }
            })
            arrayDeProductos = [...producto]
        } else {
            //agregar al principio
            arrayDeProductos.unshift(infoProducto)
        }


        console.log(arrayDeProductos)
    }
})

arrayDeProductos.forEach((el) => {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("card mod");
    tarjeta.innerHTML = `
    <img src="${el.url}" class="img-fluid" alt="Foto del producto principal">
    <h3 class="product-name mt-1 p-1">${el.nombre}</h3>
    <p>${el.precio}</p>
    <input type="button" value="Agregar al Carrito" class="btn btn-personalizado" id="boton">
    `
    const buttonAgregar = document.createElement("button");
    buttonAgregar.innerText = "Agregar"
    buttonAgregar.addEventListener("click",()=>{
        arrayDeProductos.push(el);
        localStorage.setItem("carrito",JSON.stringify(arrayDeProductos) )
    })
})

