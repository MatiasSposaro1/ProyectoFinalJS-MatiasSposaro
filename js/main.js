let productos = [];

fetch("./js/productos.json")
.then(response=>response.json())
.then(data => {
  productos = data;
  cargarProductos(productos);
})

const contenedorProductos = document.querySelector("#shopContent");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
let botonesAgregar = document.querySelectorAll(".producto-agregar");

//funcion para cargar los productos y hacerlos tipo card con su boton de agregar carrito
  function cargarProductos(productosElegidos)
  {
    contenedorProductos.innerHTML = ""; //sirve para vaciar
    
    productosElegidos.forEach(product=>{ 
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
    <img src = "${product.imagen}">
    <h3>${product.titulo}</h3>
    <p class = "price">${product.precio}$</p>
    <button class="producto-agregar" id="${product.id}">Agregar</button>
    `;
    contenedorProductos.append(content);
      
  })

  actualizarBotonesAgregar();
}

cargarProductos(productos);
  
  
//sirve esto para filtros los productos de la
botonesCategorias.forEach(boton => {
  boton.addEventListener("click",(e) =>
  {
    if(e.currentTarget.id !="todos")
    {
      const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
      cargarProductos(productosBoton);
    }else{
      cargarProductos(productos);
    }
  })
})

function actualizarBotonesAgregar() {
  botonesAgregar = document.querySelectorAll(".producto-agregar");

  botonesAgregar.forEach(boton => {
    boton.addEventListener("click",agregarAlCarrito);
  })
} 


let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
} else {
    productosEnCarrito = [];
}


function agregarAlCarrito(e){
  Toastify({
    text: "Agregado al carrito",
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function(){} // Callback after click
  }).showToast();
  const idBoton = e.currentTarget.id;
  const productoAgregado = productos.find(producto => producto.id == idBoton);


  productosEnCarrito.push(productoAgregado);

  console.log(productosEnCarrito);

  localStorage.setItem("productos-en-carrito",JSON.stringify(productosEnCarrito));
}
