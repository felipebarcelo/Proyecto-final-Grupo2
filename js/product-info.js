const productId = localStorage.getItem("idProducto");

const container = document.getElementById("product-container");

const API_URL = "https://japceibal.github.io/emercado-api/products/" + productId + ".json";

fetch(API_URL)
    .then(res => res.json())
    .then(product => {
        container.innerHTML = `
        <section id="grid">
        
            <div class="imagen-principal">
            <img src="${product.images[0]}">
            </div>

            <div class="galeria">
            ${product.images.map(img => `<img src="${img}">`).join("")}
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
        </section>`
    })
    .catch(error => {
        container.innerHTML = "<p>Error al cargar el producto.</p>";
    })






