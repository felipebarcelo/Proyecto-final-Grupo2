// Clave para almacenar el carrito en localStorage
const CART_KEY = 'cart-products';

// Función para obtener el carrito desde localStorage
function getCart() {
  const cartData = localStorage.getItem(CART_KEY);
  return cartData ? JSON.parse(cartData) : [];
}

// Función para guardar el carrito en localStorage
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// Función para calcular el subtotal
function calculateSubtotal(cart) {
  return cart.reduce((total, item) => total + (item.cost * item.quantity), 0);
}

// Función para renderizar el carrito
function renderCart() {
  const cart = getCart();
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

  const subtotal = calculateSubtotal(cart);
  const envio = 500;
  const total = subtotal + envio;

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
        <div class="card shadow-sm sticky-top" style="top: 20px;">
          <div class="card-body">
            <h5 class="card-title mb-3">Detalle de la compra:</h5>
            <div class="d-flex justify-content-between mb-2">
              <span>Productos (${cart.length}):</span>
              <span class="fw-bold">${subtotal.toLocaleString()} $UY</span>
            </div>
            <div class="d-flex justify-content-between mb-3">
              <span>Envío:</span>
              <span class="fw-bold">${envio} $UY</span>
            </div>
            <hr>
            <div class="d-flex justify-content-between mb-3">
              <span class="fs-5">Subtotal:</span>
              <span class="fs-5 fw-bold text-primary">${total.toLocaleString()} $UY</span>
            </div>
            <button class="btn btn-primary w-100">Finalizar compra</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

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