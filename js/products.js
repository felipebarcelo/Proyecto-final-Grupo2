const params = new URLSearchParams(window.location.search);
const catId = params.get("cat");// || localStorage.getItem("catID");

const grid = document.getElementById("product-grid");
const titleEl = document.getElementById("category-title");
const statusEl = document.getElementById("status-msg");

document.addEventListener("DOMContentLoaded", function () {
    if (!catId) {
        statusEl.textContent = "No se indicó ninguna categoría.";
        grid.innerHTML = "<p style='color:#666'>Elegí una categoría desde la portada.</p>";
        return;
    }

    statusEl.textContent = "Cargando productos...";

    var API_URL = "https://japceibal.github.io/emercado-api/cats_products/" + catId + ".json";

    fetch(API_URL)
        .then(function (res) {
            if (!res.ok) { throw new Error("HTTP " + res.status); }
            return res.json();
        })
        .then(function (data) {
            var label = data.catName ? data.catName : ("Categoría " + catId);
            titleEl.textContent = label;
            document.title = "Productos"; 
            grid.innerHTML = "";
            var list = Array.isArray(data.products) ? data.products : [];

            list.forEach(function (p) {
                var bloque = document.createElement("article");
                bloque.className = "bloque producto-bloque";
                bloque.innerHTML =
                    '<img src="' + p.image + '" alt="' + p.name + '" loading="lazy">' +
                    '<div class="bloque-body">' +
                    '<h3 class="producto-nombre">' + p.name + '</h3>' +
                    '<p class="producto-desc">' + p.description + '</p>' +
                    '<div class="producto-meta">' +
                    '<span class="producto-precio">' + p.currency + ' ' + p.cost + '</span>' +
                    '<span class="producto-vendidos">' + p.soldCount + ' vendidos</span>' +
                    '</div>' +
                    '</div>';
                grid.appendChild(bloque);
            });

            if (list.length === 0) {
                grid.innerHTML = "<p>No hay productos para mostrar.</p>";
            }

            statusEl.textContent = "";
        })
        .catch(function (err) {
            console.error(err);
            statusEl.textContent = "Ocurrió un error cargando los productos.";
            grid.innerHTML = "<p style='color:#b00'>No se pudieron cargar los productos.</p>";
        });
});
