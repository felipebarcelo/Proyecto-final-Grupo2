
const BASE_URL = "http://localhost:3001/";

// Categorías
const CATEGORIES_URL = BASE_URL + "cats/cat.json";

// Productos por categoría 
const CATS_PRODUCTS_URL = BASE_URL + "cats_products/";

// Detalle de producto
const PRODUCTS_URL = BASE_URL + "products/";

// Comentarios
const PRODUCT_INFO_COMMENTS_URL = BASE_URL + "products_comments/";

// Carrito
const CART_INFO_URL = BASE_URL + "user_cart/";

const CART_BUY_URL = BASE_URL + "cart/buy.json";


const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const EXT_TYPE = ".json";

let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

// Función para obtener el token de autenticación
function getAuthToken() {
  return localStorage.getItem('authToken');
}

// Función para hacer peticiones POST autenticadas
async function postJSONDataAuth(url, data) {
  const token = getAuthToken();

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        // Token inválido o expirado, redirigir al login
        localStorage.removeItem('authToken');
        localStorage.removeItem('isLoggedIn');
        window.location.href = 'login.html';
        throw new Error('Sesión expirada');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error en petición autenticada:', error);
    throw error;
  }
}