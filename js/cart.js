// Clave para almacenar el carrito en localStorage
const CART_KEY = 'cart-products';
//Almaceno el tipo de envio 
const ENVIO_KEY = 'tipoEnvioSeleccionado';

// Función para obtener el carrito desde localStorage
function getCart() {
  const cartData = localStorage.getItem(CART_KEY);
  return cartData ? JSON.parse(cartData) : [];
}

// Función para guardar el carrito en localStorage
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// Funcion para guardar en el LS la opcion de envio 
function saveEnvio(tipo) {
  localStorage.setItem(ENVIO_KEY, tipo);
}

//Funcion para traer el tipo de envio desde el LS
function getEnvio() {
  return localStorage.getItem(ENVIO_KEY);
}


function calculateSubtotal(cart) {
  return cart.reduce((total, item) => total + (item.cost * item.quantity), 0);
}

// Función para calcular el subtotal
function calculateSubtotal(cart) {
  return cart.reduce((total, item) => total + (item.cost * item.quantity), 0);
}

  function calcularEnvio(subtotal) {
  const envioSeleccionado = document.querySelector('input[name="tipoEnvio"]:checked');

  if (!envioSeleccionado) return 0;

  if (envioSeleccionado.value === "premium") {
    return subtotal * 0.15;
  } else if (envioSeleccionado.value === "express") {
    return subtotal * 0.07;
  } else {
    return subtotal * 0.05;
  }
}


// Función para renderizar el carrito
function renderCart() {
  const cart = getCart();
  const subtotal = calculateSubtotal(cart);
  const envioGuardado = getEnvio();
  /*const envio = calcularEnvio(subtotal);
  const total = subtotal + envio;*/

  const container = document.querySelector('main .container');

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="alert alert-info text-center" role="alert">
        <h4 class="alert-heading">Tu carrito está vacío</h4>
        <p>No hay ningún producto cargado en el carrito.</p>
        <a href="categories.html" class="btn btn-primary mt-3">Ir a categorías</a>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <h1 class="mb-4">Mi Carrito</h1>
    <div class="row">
      <div class="col-lg-8">
        ${cart.map((item, index) => `
          <div class="card mb-3 shadow-sm">
            <div class="card-body">
              <div class="row align-items-center">
                <div class="col-md-3">
                  <img src="${item.image}" class="img-fluid rounded" alt="${item.name}">
                </div>
                <div class="col-md-6">
                  <h5 class="card-title">${item.name}</h5>
                  <p class="card-text text-muted">${item.description}</p>
                  <p class="text-primary fw-bold">${item.cost} $UY</p>
                </div>
                <div class="col-md-3 text-center">
                  <label class="form-label">Cantidad:</label>
                  <div class="input-group mb-2">
                    <button class="btn btn-outline-secondary" onclick="changeQuantity(${index}, -1)">-</button>
                    <input type="number" class="form-control text-center" value="${item.quantity}" min="1" 
                           onchange="updateQuantity(${index}, this.value)" style="max-width: 60px;">
                    <button class="btn btn-outline-secondary" onclick="changeQuantity(${index}, 1)">+</button>
                  </div>
                  <button class="btn btn-sm btn-danger" onclick="removeItem(${index})">
                    <i class="fa fa-trash"></i> Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
      
      <div class="col-lg-4">

        <div class="accordion my-3" id="accordionEnvio">
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingEnvio">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEnvio">
                Tipo de Envío
              </button>
            </h2>
            <div id="collapseEnvio" class="accordion-collapse collapse" data-bs-parent="#accordionEnvio">
              <div class="accordion-body">
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="tipoEnvio" id="envioPremium" value="premium">
                  <label class="form-check-label" for="envioPremium"><strong>Premium</strong> - - - - 2 a 5 días (15%)</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="tipoEnvio" id="envioExpress" value="express">
                  <label class="form-check-label" for="envioExpress"><strong>Express</strong> - - - - 6 a 9 días (7%)</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="tipoEnvio" id="envioEstandar" value="estandar">
                  <label class="form-check-label" for="envioEstandar"><strong>Estándar</strong>- - - - 10 a 15 días (5%)</label>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div class="accordion my-3" id="accordionDireccion">
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingDireccion">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseDireccion">
              Dirección de Envío
              </button>
            </h2>
            <div id="collapseDireccion" class="accordion-collapse collapse" data-bs-parent="#accordionDireccion">
              <div class="accordion-body">
                <form id="formDireccion">
                  <div class="mb-3">
                    <label for="departamento" class="form-label">Departamento</label>
                    <input type="text" class="form-control" id="departamento" required>
                  </div>
                  <div class="mb-3">
                    <label for="localidad" class="form-label">Localidad</label>
                    <input type="text" class="form-control" id="localidad" required>
                  </div>
                  <div class="mb-3">
                    <label for="calle" class="form-label">Calle</label>
                    <input type="text" class="form-control" id="calle" required>
                  </div>
                  <div class="mb-3">
                    <label for="numero" class="form-label">Número</label>
                    <input type="text" class="form-control" id="numero" required>
                  </div>
                  <div class="mb-3">
                    <label for="esquina" class="form-label">Esquina</label>
                    <input type="text" class="form-control" id="esquina" required>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div class="accordion my-3" id="accordionPago">
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingPago">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapsePago">
                Forma de Pago
              </button>
            </h2>
            <div id="collapsePago" class="accordion-collapse collapse" data-bs-parent="#accordionPago">
              <div class="accordion-body">
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="formaPago" id="pagoTransferencia" value="transferencia">
                  <label class="form-check-label" for="pagoTransferencia"><strong>Transferencia Bancaria</strong></label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="formaPago" id="pagoTarjeta" value="tarjeta">
                  <label class="form-check-label" for="pagoTarjeta"><strong>Tarjeta de Crédito</strong></label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="formaPago" id="pagoEfectivo" value="efectivo">
                  <label class="form-check-label" for="pagoEfectivo"><strong>Efectivo</strong></label>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div class="card shadow-sm sticky-top" style="top: 20px;">
          <div class="card-body">
            <h5 class="card-title mb-3">Detalle de la compra:</h5>
            <div class="d-flex justify-content-between mb-2">
              <span>Productos (${cart.length}):</span>
              <span class="fw-bold">${subtotal.toLocaleString()} $UY</span>
            </div>
            <div class="d-flex justify-content-between mb-3">
              <span>Envío:</span>
              <span class="fw-bold">${calcularEnvio(subtotal).toFixed()} $UY</span>
            </div>
            <hr>
            <div class="d-flex justify-content-between mb-3">
              <span class="fs-5">Subtotal:</span>
              <span class="fs-5 fw-bold text-primary">${(subtotal + calcularEnvio(subtotal)).toLocaleString()} $UY</span>
            </div>
            <button class="btn btn-primary w-100">Finalizar compra</button>
          </div>
        </div>
      </div>
    </div>
  `;

  if (envioGuardado) {
    const radio = document.querySelector(`input[name="tipoEnvio"][value="${envioGuardado}"]`);
    if (radio) radio.checked = true;
  }

  document.querySelectorAll('input[name="tipoEnvio"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      saveEnvio(e.target.value);
      renderCart();
    });
  });
};


// Función para cambiar la cantidad (incrementar/decrementar)
function changeQuantity(index, delta) {
  const cart = getCart();
  const newQuantity = cart[index].quantity + delta;

  if (newQuantity > 0) {
    cart[index].quantity = newQuantity;
    saveCart(cart);
    renderCart();
  }
}

// Función para actualizar la cantidad directamente
function updateQuantity(index, value) {
  const cart = getCart();
  const quantity = parseInt(value);

  if (quantity > 0) {
    cart[index].quantity = quantity;
    saveCart(cart);
    renderCart();
  } else {
    renderCart(); // Recargar para restaurar el valor anterior
  }
}

// Función para eliminar un producto del carrito
function removeItem(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCart();
}

// Renderizar el carrito al cargar la página
document.addEventListener('DOMContentLoaded', renderCart);

