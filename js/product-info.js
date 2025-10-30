const productId = localStorage.getItem("idProducto");

const container = document.getElementById("product-container");

const API_URL = "https://japceibal.github.io/emercado-api/products/" + productId + ".json";

// Variable global para guardar el producto actual
let currentProduct = null;

//fetch para traer los productos
fetch(API_URL)
  .then(res => res.json())
  .then(product => {
    // Guardar el producto en la variable global
    currentProduct = product;
    
    container.innerHTML = `
        <section id="grid">

            <div class="imagen-principal">
            <div class="cat">
            <a href="products.html"><i class="fa-solid fa-arrow-left"></i> ${product.category}</a>
            </div>
            <img id="imagenprincipal" src="${product.images[0]}">
            </div>

            <div class="galeria">
            ${product.images.map((img) => `<img class="fotos" src="${img}">`).join("")}
            </div>
        
            <div class="titulo-desc">
            <h2>${product.name}</h2>
            <p>${product.description}</p>

            </div>

            <div class="precio-boton">
            <p class="precio">${product.cost} $UY</p>
            <div class="boton-vendidos">
            <p class="vendidos">${product.soldCount} vendidos</p>
            <button id="btn-comprar" onclick="addToCart()">Comprar</button>            
            </div>
            </div>
        </section>
        `;
    //Para poder cambiar la foto principal por una de la galeria 
    const imagenPrincipal = document.getElementById("imagenprincipal");
    const fotos = document.querySelectorAll(".galeria img");

    fotos.forEach((fotos) => {
      fotos.addEventListener("click", () => {
        if (fotos.src !== imagenPrincipal.src) {
          imagenPrincipal.src = fotos.src;
        }
      });
    });


  //Botón comprar
    
    const buyBtn = container.querySelector('.precio-boton .boton-vendidos button') || container.querySelector('button');
    if (buyBtn) {
      buyBtn.addEventListener('click', () => {
        try {
          const CART_KEY = 'cart';
          //Ver  el estado del carrito desde Local Storage e inicializar como array vacío si es null.
          const stored = JSON.parse(localStorage.getItem(CART_KEY) || '[]');

          const item = {
            id: product.id,
            name: product.name,
            unitCost: product.cost,
            currency: product.currency || 'UYU',
            count: 1,
            image: product.images && product.images.length ? product.images[0] : ''
          };

          // Buscar si el ítem ya existe
          const idx = stored.findIndex(i => String(i.id) === String(item.id));
          if (idx > -1) {
            stored[idx].count = (stored[idx].count || 0) + 1;
          } else {
            stored.push(item);
          }

          // Actualización de localStorage.
          localStorage.setItem(CART_KEY, JSON.stringify(stored));

          // Redirección al carrito.
          window.location.href = 'cart.html';
        } catch (err) {
          console.error('Error guardando en el carrito', err);
          alert('No se pudo agregar el producto al carrito. Intente nuevamente.');
        }
      });
    }
  })
  //Si hay error
  .catch(error => {
    container.innerHTML = "<p>Error al cargar el producto.</p>";
  });




//Fetch comentarios
const API_COMMENTS = "https://japceibal.github.io/emercado-api/products_comments/" + productId + ".json";

fetch(API_COMMENTS)
  .then(res => res.json())
  .then(data => {
    console.log(data);

    const nuevaSection = document.createElement('section');
    nuevaSection.className = "container mt-4";

    const row = document.createElement("div");
    row.className = "row g-3"

    if (data.length === 0) {
      const p = document.createElement("p")
      p.textContent = "Aun no hay opiniones sobre este producto."
      nuevaSection.appendChild(p);
    } else {

      data.forEach(comentario => {
        const col = document.createElement("div");
        col.className = "col-md-6 col-lg-4";

        col.innerHTML = `
        <div class="card h-100 shadow-sm">
        <div class="card-body">
        <div class="mb-2 text-warning">
                  ${'<i class="fa-solid fa-star" style="color: #FFD43B;"></i>'.repeat(comentario.score)}${'<i class="fa-regular fa-star fa-sm" style="color: #FFD43B;"></i>'.repeat(5 - comentario.score)}
        </div>
          <h5 class="card-title">${comentario.user}</h5>
          <p class="card-text">${comentario.description}</p>
          <p class="card-text">
            <small class="text-muted">${comentario.dateTime}</small>
          </p>
      `;

        row.appendChild(col)
      });

      nuevaSection.appendChild(row);
    }
    document.getElementById("comentarios").appendChild(nuevaSection);
  })
  .catch(err => console.error(err));


// DESAFÍATE 
const stars = document.querySelectorAll(".star-rating i"); // agarro las estrellas
const txt = document.querySelector(".calificacion textarea"); // agarro el textarea
const btn = document.querySelector(".btn-calificacion"); // agarro el botón
const getList = () => document.querySelector("#comentarios .row") || document.querySelector("#comentarios"); // donde muestro los comentarios
const KEY = `product-comments-${productId}`; // clave para guardar en localStorage
let score = 0; // acá guardo el puntaje

// función para pintar las estrellas
function showStars(n) {
  stars.forEach((s, i) => {
    s.className = i < n ? "fa fa-star" : "fa fa-star-o";
    s.style.color = "#FFD43B";
  });
}

// función para agregar una card con la opinión
function addCard(c) {
  const list = getList();
  if (!list) return;
  list.insertAdjacentHTML("afterbegin", `
    <div class="col-md-6 col-lg-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body">
          <div class="mb-2 text-warning">${"★".repeat(c.score)}${"☆".repeat(5 - c.score)}</div>
          <h5 class="card-title">${c.user}</h5>
          <p>${c.description}</p>
          <small class="text-muted">${c.dateTime}</small>
        </div>
      </div>
    </div>
  `);
}

// cuando cargo la página muestro lo que estaba guardado
(JSON.parse(localStorage.getItem(KEY) || "[]")).forEach(addCard);

// cuando hago click en una estrella guardo el valor y habilito el form
stars.forEach((s, i) => s.addEventListener("click", () => {
  score = i + 1;
  showStars(score);
  txt.disabled = false;
  btn.disabled = false;
}));

// cuando aprieto el botón creo el comentario y lo guardo
btn?.addEventListener("click", () => {
  const description = (txt.value || "").trim();
  if (!score || !description) return alert("Faltan datos");
  const d = new Date();
  const c = {
    user: localStorage.getItem("userEmail") || "Tú",
    dateTime: d.toLocaleString(),
    score,
    description
  };
  addCard(c); // lo muestro
  const arr = JSON.parse(localStorage.getItem(KEY) || "[]");
  arr.push(c);
  localStorage.setItem(KEY, JSON.stringify(arr)); // lo guardo
  score = 0; showStars(0); txt.value = ""; txt.disabled = true; btn.disabled = true; // limpio todo
});

// ============================================
// FUNCIÓN PARA AGREGAR AL CARRITO
// ============================================
function addToCart() {
  if (!currentProduct) {
    alert('Error: No se pudo cargar el producto');
    return;
  }

  const CART_KEY = 'cart-products';
  const cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
  
  // Buscar si el producto ya existe en el carrito
  const existingIndex = cart.findIndex(item => item.id === currentProduct.id);
  
  if (existingIndex >= 0) {
    // Si existe, incrementar cantidad
    cart[existingIndex].quantity += 1;
    alert(`Se agregó otra unidad de "${currentProduct.name}" al carrito`);
  } else {
    // Si no existe, agregar nuevo producto
    cart.push({
      id: currentProduct.id,
      name: currentProduct.name,
      description: currentProduct.description,
      cost: currentProduct.cost,
      image: currentProduct.images[0],
      quantity: 1
    });
    alert(`"${currentProduct.name}" se agregó al carrito`);
  }
  
  // Guardar en localStorage
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  
  // Preguntar si quiere ir al carrito
  if (confirm('¿Deseas ir al carrito para finalizar la compra?')) {
    window.location.href = 'cart.html';
  }
}