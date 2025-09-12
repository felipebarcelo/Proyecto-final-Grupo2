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

                //Local Storage y Redireccion a producto especifico
                productCard.addEventListener("click", () =>{
                    localStorage.setItem("idProducto", p.id);
                    window.location.href = "product-info.html";
                })

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
document.addEventListener("DOMContentLoaded", () => {

    const grid = document.getElementById("product-grid");
    const inputMin = document.getElementById("priceMin");
    const inputMax = document.getElementById("priceMax");
    const btnFilter = document.getElementById("btnPriceFilter");
    const btnClear = document.getElementById("btnPriceClear");
    const sortAscBtn = document.getElementById("sortAsc");
    const sortDescBtn = document.getElementById("sortDesc");
    const sortRelBtn = document.getElementById("sortRel");

    // ESTADO 
    let masterList = [];
    let currentSort = null;

    //  CARGA INICIAL 
    const catId = localStorage.getItem("catID") || 101;
    const API_URL = `https://japceibal.github.io/emercado-api/cats_products/${catId}.json`;

    fetch(API_URL)
        .then(r => {
            if (!r.ok) throw new Error("HTTP " + r.status);
            return r.json();
        })
        .then(data => {
            masterList = Array.isArray(data.products) ? data.products : [];
            refresh();
        })
        .catch(err => {
            grid.innerHTML = `<p class="text-danger">Error cargando productos: ${err.message}</p>`;
            console.error(err);
        });

    // RENDER 
    function render(list) {
        grid.innerHTML = "";
        if (!list.length) {
            grid.innerHTML = `<p>No hay productos para mostrar con los criterios seleccionados.</p>`;
            return;
        }
        list.forEach(p => {
            const card = document.createElement("div");
            card.className = "product-card";
            card.innerHTML = `
        <div class="product-card__img">
          <img src="${p.image}" alt="${p.name}">
        </div>
        <div class="product-card__body">
          <h3 class="product-card__title">${p.name}</h3>
          <p class="product-card__desc">${p.description}</p>
          <div class="product-card__meta">
            <span class="product-card__price">${p.currency} ${p.cost}</span>
            <span class="product-card__sold">${p.soldCount} vendidos</span>
          </div>
          <button class="btn btn-buy" type="button">Comprar</button>
        </div>
      `;
            grid.appendChild(card);
        });
    }

    // FILTRO
    function getFiltered() {
        const min = Number.parseInt(inputMin?.value, 10);
        const max = Number.parseInt(inputMax?.value, 10);

        return masterList.filter(p => {
            const price = Number(p.cost);
            const okMin = Number.isNaN(min) ? true : price >= min;
            const okMax = Number.isNaN(max) ? true : price <= max;
            return okMin && okMax;
        });
    }

    // ORDEN
    function applySort(list) {
        const arr = list.slice();
        if (currentSort === "asc") {
            arr.sort((a, b) => a.cost - b.cost);
        } else if (currentSort === "desc") {
            arr.sort((a, b) => b.cost - a.cost);
        } else if (currentSort === "rel") {
            arr.sort((a, b) => b.soldCount - a.soldCount);
        }
        return arr;
    }

    // COMBINAR FILTRO + ORDEN
    function refresh() {
        const filtered = getFiltered();
        const sorted = applySort(filtered);
        render(sorted);
    }

    // EVENTOS 
    btnFilter?.addEventListener("click", (e) => { e.preventDefault(); refresh(); });

    [inputMin, inputMax].forEach(inp => {
        inp?.addEventListener("keydown", e => {
            if (e.key === "Enter") { e.preventDefault(); refresh(); }
        });
    });

    btnClear?.addEventListener("click", (e) => {
        e.preventDefault();
        if (inputMin) inputMin.value = "";
        if (inputMax) inputMax.value = "";
        currentSort = null;
        render(masterList);
    });

    sortAscBtn?.addEventListener("click", (e) => { e.preventDefault(); currentSort = "asc"; refresh(); });
    sortDescBtn?.addEventListener("click", (e) => { e.preventDefault(); currentSort = "desc"; refresh(); });
    sortRelBtn?.addEventListener("click", (e) => { e.preventDefault(); currentSort = "rel"; refresh(); });
});
