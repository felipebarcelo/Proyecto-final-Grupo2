const productId = localStorage.getItem("idProducto");

const container = document.getElementById("product-container");

const API_URL = "https://japceibal.github.io/emercado-api/products/" + productId + ".json";

//fetch para traer los productos
fetch(API_URL)
    .then(res => res.json())
    .then(product => {
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
            <button>Comprar</button>            
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
    })
    //Si hay error
    .catch(error => {
        container.innerHTML = "<p>Error al cargar el producto.</p>";
    });

///RELACIONADOS/// 
document.addEventListener("DOMContentLoaded", function () {
    // Obtiene el ID de la categoría desde localStorage, por defecto 101 si no existe
    const catId = localStorage.getItem("catID") || 101;

    const grid = document.getElementById("related-products");

    const API_URL = "https://japceibal.github.io/emercado-api/cats_products/" + catId + ".json";

    fetch(API_URL)
        .then(function (res) {
            if (!res.ok) {
                throw new Error("HTTP " + res.status);
            }
            return res.json();
        })
        .then(function (data) {
            grid.innerHTML = ""; // Limpia el grid antes de agregar productos

            var list = Array.isArray(data.products) ? data.products : [];

            list.forEach(function (p) {
                const productCard = document.createElement("div");
                productCard.classList.add("product-card");

                productCard.innerHTML = `
                    <img src="${p.image}" alt="${p.name}">
                    <h2>${p.name}</h2>
                `;
                productCard.addEventListener("click", () => {
                    localStorage.setItem("idProducto", p.id); // guardamos id
                    localStorage.setItem("catID", catId); // mantenemos categoría
                    window.location.href = "product-info.html"; // recarga la página
                });


                grid.appendChild(productCard);
            });

            if (list.length === 0) {
                grid.innerHTML = "<p>No hay productos para mostrar.</p>";
            }
        })
        .catch(function (err) {
            console.error(err);
            grid.innerHTML = "<p style='color:#b00'>No se pudieron cargar los productos.</p>";
        });
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
    document.getElementById("comentarios").appendChild(nuevaSection);
  })
  .catch(err => console.error(err));
