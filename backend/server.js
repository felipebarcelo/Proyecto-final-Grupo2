const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();


// Middleware
app.use(cors());
app.use(express.json());

const readJSON = (filePath) => {
  try {
    const data = fs.readFileSync(path.join(__dirname, filePath), 'utf8')
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error leyendo archivo ${filePath}:`, error);
    return null;
  }
}

//Obtener Categorias
app.get('/cats/cat.json', (req, res) => {
  const data = readJSON('data/cats/cat.json');
  if (data) {
    res.json(data);
  } else {
    res.status(404).json({ error: 'Categorias no encontradas' })
  }
})

//Obtener poructos de una categoria
app.get('/cats_products/:id.json', (req, res) => {
  const categoriaId = req.params.id;
  const data = readJSON(`data/cats_products/${categoriaId}.json`);
  if (data) {
    res.json(data);
  } else {
    res.status(404).json({ error: 'Categoría no encontrada'})
  }
});

// Obtener productos especificos
app.get('/products/:id.json', (req, res) => {
  const productId = req.params.id;
  const data = readJSON(`data/products/${productId}.json`)
  if (data) {
    res.json(data);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' })
  }
});

//Obtener comentarios
app.get('/products_comments/:id.json', (req, res) => {
  const productId = req.params.id;
  const data = readJSON(`data/products_comments/${productId}.json`)
  if (data) {
    res.json(data);
  } else {
    res.status(404).json({ error: 'Comentarios no encontrados' });
  }
});

// Carrito
app.get('/user_cart/:id.json', (req, res) => {
  const usuarioId = req.params.id;
  const data = readJSON(`data/user_cart/${usuarioId}.json`)
  if (data) {
    res.json(data);
  } else {
    res.status(404).json({error: "No se encontro el carrito"});
  }
});

app.get('/', (req, res) => {
  res.json({
    message: 'Bienvenido a la API de e-Mercado',
    endpoints: {
      categories: '/cats/cat.json',
      categoryProducts: '/cats_products/:id.json',
      productDetails: '/products/:id.json',
      productComments: '/products_comments/:id.json',
      userCart: '/user_cart/:id.json',
      buy: 'POST /cart/buy.json',
      publish: 'POST /sell/publish.json'
    }
  });
});

// Realizar compra
app.post('/cart/buy.json', (req, res) => {
  const data = readJSON('emercado-api-main/cart/buy.json');
  if (data) {
    res.json(data);
  } else {
    res.status(500).json({ error: 'Error al procesar la compra' });
  }
});

// Puerto
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});