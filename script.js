/* =================================
   VARIABLES
================================= */

let carrito = [];
let favoritos = 0;


/* =================================
   FORMATO DE PESOS COLOMBIANOS
================================= */

function formatoPesos(valor) {

    return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(Number(valor));

}


/* =================================
   CARRITO
================================= */

function agregarCarrito(nombre, precio) {

    carrito.push({
        nombre: nombre,
        precio: Number(precio)
    });

    actualizarCarrito();

    abrirCarrito();
}


function actualizarCarrito() {

    const lista =
        document.getElementById("listaCarrito");

    const cantidad =
        document.getElementById("carritoCantidad");

    const total =
        document.getElementById("total");


    cantidad.textContent = carrito.length;


    if (carrito.length === 0) {

        lista.innerHTML = `
            <p class="carrito-vacio">
                Tu carrito está vacío.
            </p>
        `;

        total.textContent = "$0";

        return;
    }


    lista.innerHTML = "";

    let suma = 0;


    carrito.forEach((producto, index) => {

        suma += Number(producto.precio);


        const item =
            document.createElement("div");

        item.className = "item-carrito";


        item.innerHTML = `

            <div>

                <h4>
                    ${producto.nombre}
                </h4>

                <p>
                    ${formatoPesos(producto.precio)}
                </p>

            </div>

            <button
                onclick="eliminarProducto(${index})"
            >
                ×
            </button>

        `;


        lista.appendChild(item);

    });


    total.textContent = formatoPesos(suma);
}


/* =================================
   ELIMINAR PRODUCTO
================================= */

function eliminarProducto(index) {

    carrito.splice(index, 1);

    actualizarCarrito();
}


/* =================================
   ABRIR CARRITO
================================= */

function abrirCarrito() {

    document
        .getElementById("carritoPanel")
        .classList.add("abierto");

    document
        .getElementById("overlay")
        .style.display = "block";
}


/* =================================
   CERRAR CARRITO
================================= */

function cerrarCarrito() {

    document
        .getElementById("carritoPanel")
        .classList.remove("abierto");

    document
        .getElementById("overlay")
        .style.display = "none";
}


/* =================================
   FAVORITOS
================================= */

function agregarFavorito(boton) {

    boton.classList.toggle("activo");


    if (boton.classList.contains("activo")) {

        boton.innerHTML = "♥";

        favoritos++;

    } else {

        boton.innerHTML = "♡";

        favoritos--;

    }


    document
        .getElementById("favoritosCantidad")
        .textContent = favoritos;
}


function abrirFavoritos() {

    alert(
        favoritos > 0
            ? `Tienes ${favoritos} producto(s) en favoritos ❤️`
            : "Todavía no tienes favoritos."
    );
}


/* =================================
   BUSCADOR
================================= */

function abrirBusqueda() {

    document
        .getElementById("buscador")
        .style.display = "flex";

    document
        .getElementById("busqueda")
        .focus();
}


function cerrarBusqueda() {

    document
        .getElementById("buscador")
        .style.display = "none";
}


function buscarProductos() {

    const texto =
        document
            .getElementById("busqueda")
            .value
            .toLowerCase();


    const productos =
        document.querySelectorAll(".producto");


    productos.forEach(producto => {

        const contenido =
            producto.textContent.toLowerCase();


        if (contenido.includes(texto)) {

            producto.style.display = "";

        } else {

            producto.style.display = "none";

        }

    });
}


/* =================================
   FILTROS
================================= */

function filtrar(categoria, boton) {

    document
        .querySelectorAll(".filtro")
        .forEach(b => b.classList.remove("activo"));


    boton.classList.add("activo");


    document
        .querySelectorAll(".producto")
        .forEach(producto => {

            if (
                categoria === "todos" ||
                producto.dataset.categoria === categoria
            ) {

                producto.style.display = "";

            } else {

                producto.style.display = "none";

            }

        });
}


/* =================================
   MODAL
================================= */

function verProducto(nombre, precio) {

    const modal =
        document.getElementById("modal");

    const contenido =
        document.getElementById("modalContenido");


    contenido.innerHTML = `

        <p class="subtitulo">
            SINGAPUR MEDELLIN
        </p>

        <h2>
            ${nombre}
        </h2>

        <p>
            Una pieza diseñada para quienes
            buscan elegancia, exclusividad
            y calidad en cada detalle.
        </p>

        <h3 style="margin:20px 0">
            ${formatoPesos(precio)}
        </h3>

        <button
            class="btn-gold"
            onclick="agregarCarrito('${nombre}', ${precio}); cerrarModal();"
        >
            AGREGAR AL CARRITO
        </button>

    `;


    modal.style.display = "flex";
}


/* =================================
   CERRAR MODAL
================================= */

function cerrarModal() {

    document
        .getElementById("modal")
        .style.display = "none";
}


/* =================================
   NEWSLETTER
================================= */

function suscribirse(event) {

    event.preventDefault();

    alert(
        "¡Gracias por suscribirte a Joyería Singapur! ✨"
    );

    event.target.reset();
}


/* =================================
   CONTACTO
================================= */

function enviarFormulario(event) {

    event.preventDefault();

    alert(
        "¡Mensaje enviado correctamente! 💎"
    );

    event.target.reset();
}


/* =================================
   FINALIZAR COMPRA
================================= */

function finalizarCompra() {

    if (carrito.length === 0) {

        alert(
            "Tu carrito está vacío."
        );

        return;
    }


    let mensaje =
        "Hola, quiero comprar:%0A%0A";


    carrito.forEach(producto => {

        mensaje +=
            `• ${producto.nombre} - ${formatoPesos(producto.precio)}%0A`;

    });


    const total =
        carrito.reduce(
            (suma, producto) =>
                suma + Number(producto.precio),
            0
        );


    mensaje +=
        `%0ATotal: ${formatoPesos(total)}`;


    window.open(
        `https://wa.me/573003262771?text=${mensaje}`,
        "_blank"
    );
}


/* =================================
   CERRAR TODO
================================= */

function cerrarTodo() {

    cerrarCarrito();

    cerrarModal();

}


/* =================================
   MOSTRAR CATEGORÍA
================================= */

function mostrarCategoria(categoria) {

    const productos =
        document.querySelectorAll(".producto");


    productos.forEach(producto => {

        if (
            producto.dataset.categoria === categoria
        ) {

            producto.style.display = "";

        } else {

            producto.style.display = "none";

        }

    });


    document
        .getElementById("coleccion")
        .scrollIntoView({
            behavior: "smooth"
        });

        
}