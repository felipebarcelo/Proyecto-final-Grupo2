
const BASE_URL = "http://localhost:3000/";

// Categorías
const CATEGORIES_URL = BASE_URL + "cats/cat.json";

// Productos por categoría (se le concatena el ID + .json)
const CATS_PRODUCTS_URL = BASE_URL + "cats_products/";

// Detalle de producto
const PRODUCTS_URL = BASE_URL + "products/";

// Comentarios
const PRODUCT_INFO_COMMENTS_URL = BASE_URL + "products_comments/";

// Carrito
const CART_INFO_URL = BASE_URL + "user_cart/";

const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";


const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}