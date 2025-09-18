// buscador.js
document.addEventListener("DOMContentLoaded", function () {
    // Obtiene el ID de la categoría desde localStorage
    const catId = localStorage.getItem("catID") || 101;
    const grid = document.getElementById("product-grid");
    const statusMsg = document.getElementById("status-msg");
    const titulo = document.getElementById("titulo");
    const productContainer = document.getElementById("product-container");
    
    // Crear y agregar el campo de búsqueda
    const searchContainer = document.createElement("div");
    searchContainer.className = "search-container";
    
    const searchInput = document.createElement("input");
    searchInput.type = "search";
    searchInput.id = "product-search";
    searchInput.className = "form-control mb-4";
    searchInput.placeholder = "Buscar productos por nombre o descripción...";
    
    searchContainer.appendChild(searchInput);
    
    // Insertar el buscador después del título y antes del status-msg
    titulo.parentNode.insertBefore(searchContainer, statusMsg);
    
    const API_URL = "https://japceibal.github.io/emercado-api/cats_products/" + catId + ".json";

    let productsList = [];
    let currentCategory = "";

    function renderProducts(list) {
        grid.innerHTML = ""; // Limpia el grid antes de agregar productos

        if (list.length === 0) {
            grid.innerHTML = "<p class='text-center text-muted py-4'>No se encontraron productos.</p>";
            statusMsg.textContent = "No hay productos para mostrar con los criterios de búsqueda.";
            return;
        }

        statusMsg.textContent = `Mostrando ${list.length} de ${productsList.length} productos`;
        
        list.forEach(function (p) {
            const productCard = document.createElement("div");
            productCard.className = "product-card";
            
            // Formatear el precio con separadores de miles
            const formattedPrice = parseInt(p.cost).toLocaleString('es-UY');
            
            productCard.innerHTML = `
                <img src="${p.image}" alt="${p.name}">
                <h2>${p.name}</h2>
                <p>${p.description}</p>
                <span>Precio: ${p.currency} ${formattedPrice}</span>
                <span>${p.soldCount} vendidos</span>
            `;
            
            productCard.addEventListener("click", () => {
            localStorage.setItem("idProducto", p.id);
            window.location.href = "./product-info.html";
            })

            grid.appendChild(productCard);
        });
    }

    // Mostrar estado de carga
    grid.innerHTML = "<p class='text-center py-4'>Cargando productos...</p>";

    fetch(API_URL)
        .then(function (res) {
            if (!res.ok) {
                throw new Error("HTTP " + res.status);
            }
            return res.json();
        })
        .then(function (data) {
            productsList = Array.isArray(data.products) ? data.products : [];
            currentCategory = data.catName;
            
            // Actualizar el título con la categoría
            titulo.textContent = currentCategory;
            
            renderProducts(productsList);
        })
        .catch(function (err) {
            console.error(err);
            grid.innerHTML = "<p class='text-center text-danger py-4'>No se pudieron cargar los productos. Intenta nuevamente.</p>";
            statusMsg.textContent = "Error al cargar los productos";
        });

    // Filtra productos en tiempo real
    searchInput.addEventListener("input", function () {
        const query = searchInput.value.trim().toLowerCase();
        
        if (query === "") {
            renderProducts(productsList);
            return;
        }
        
        const filtered = productsList.filter(p =>
            (p.name && p.name.toLowerCase().includes(query)) ||
            (p.description && p.description.toLowerCase().includes(query))
        );
        
        renderProducts(filtered);
    });
});