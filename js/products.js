document.addEventListener("DOMContentLoaded", function () {
    // Obtiene el ID de la categoría desde localStorage, por defecto 101 si no existe
    const catId = localStorage.getItem("catID") || 101;

    const grid = document.getElementById("product-grid");

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
                    <p>${p.description}</p>
                    <span>Precio: ${p.currency} ${p.cost}</span>
                    <span>${p.soldCount} vendidos</span>
                `;

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
