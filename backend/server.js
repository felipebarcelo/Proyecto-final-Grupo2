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

//Obtener productos de una categoria
app.get('/cats_products/:id.json', (req, res) => {
  const categoriaId = req.params.id;
  const data = readJSON(`data/cats_products/${categoriaId}.json`);
  if (data) {
    res.json(data);
  } else {
    res.status(404).json({ error: 'Categoría no encontrada' })
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
    res.status(404).json({ error: "No se encontro el carrito" });
  }
});

// ========================================
// NUEVO ENDPOINT POST /cart
// ========================================
app.post('/cart', (req, res) => {
  try {
    // Obtener los datos del carrito desde el body de la petición
    const { cliente_id, productos, direccion, tipo_envio, forma_pago } = req.body;

    // Validaciones básicas
    if (!cliente_id) {
      return res.status(400).json({
        success: false,
        error: 'El ID del cliente es requerido'
      });
    }

    if (!productos || !Array.isArray(productos) || productos.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Debe enviar al menos un producto'
      });
    }

    // Validar que cada producto tenga los campos necesarios
    for (let producto of productos) {
      if (!producto.id || !producto.quantity || !producto.cost) {
        return res.status(400).json({
          success: false,
          error: 'Cada producto debe tener id, quantity y cost'
        });
      }
    }

    if (!direccion || !direccion.departamento || !direccion.calle) {
      return res.status(400).json({
        success: false,
        error: 'La dirección de envío es incompleta'
      });
    }

    if (!tipo_envio) {
      return res.status(400).json({
        success: false,
        error: 'Debe especificar el tipo de envío'
      });
    }

    if (!forma_pago) {
      return res.status(400).json({
        success: false,
        error: 'Debe especificar la forma de pago'
      });
    }

    // Calcular totales
    const subtotal = productos.reduce((total, item) => {
      return total + (item.cost * item.quantity);
    }, 0);

    let costoEnvio = 0;
    if (tipo_envio === 'premium') {
      costoEnvio = subtotal * 0.15;
    } else if (tipo_envio === 'express') {
      costoEnvio = subtotal * 0.07;
    } else if (tipo_envio === 'estandar') {
      costoEnvio = subtotal * 0.05;
    }

    const total = subtotal + costoEnvio;

    // Crear objeto de carrito para guardar
    const carrito = {
      id: Date.now(), // ID temporal usando timestamp
      cliente_id,
      productos,
      direccion,
      tipo_envio,
      forma_pago,
      subtotal,
      costo_envio: costoEnvio,
      total,
      fecha: new Date().toISOString(),
      estado: 'completado'
    };

    // Guardar en archivo JSON (simulando base de datos)
    const cartFilePath = path.join(__dirname, 'data', 'carritos.json');

    // Leer carritos existentes o crear array vacío
    let carritos = [];
    if (fs.existsSync(cartFilePath)) {
      const data = fs.readFileSync(cartFilePath, 'utf8');
      carritos = JSON.parse(data);
    }

    // Agregar nuevo carrito
    carritos.push(carrito);

    // Guardar en archivo
    fs.writeFileSync(cartFilePath, JSON.stringify(carritos, null, 2));

    console.log('Carrito guardado exitosamente:', carrito);

    // Responder con éxito
    res.status(201).json({
      success: true,
      message: 'Carrito guardado exitosamente',
      data: carrito
    });

  } catch (error) {
    console.error('Error al procesar el carrito:', error);
    res.status(500).json({
      success: false,
      error: 'Error al procesar el carrito',
      details: error.message
    });
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
      cart: 'POST /cart',
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