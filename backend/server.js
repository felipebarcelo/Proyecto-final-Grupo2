const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET || 'emercado_dev_secret';

const readJSON = (filePath) => {
  try {
    const data = fs.readFileSync(path.join(__dirname, filePath), 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error al leer el archivo ${filePath}:`, error);
    return null;
  }
};

// Obtener categorías
app.get('/cats/cat.json', (req, res) => {
  const data = readJSON('data/cats/cat.json');
  if (data) {
    res.json(data);
  } else {
    res.status(404).json({ error: 'Categorías no encontradas' });
  }
});

// Obtener productos de una categoría
app.get('/cats_products/:id.json', (req, res) => {
  const categoriaId = req.params.id;
  const data = readJSON(`data/cats_products/${categoriaId}.json`);
  if (data) {
    res.json(data);
  } else {
    res.status(404).json({ error: 'Categoría no encontrada' });
  }
});

// Obtener producto específico
app.get('/products/:id.json', (req, res) => {
  const productId = req.params.id;
  const data = readJSON(`data/products/${productId}.json`);
  if (data) {
    res.json(data);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

// Obtener comentarios de un producto
app.get('/products_comments/:id.json', (req, res) => {
  const productId = req.params.id;
  const data = readJSON(`data/products_comments/${productId}.json`);
  if (data) {
    res.json(data);
  } else {
    res.status(404).json({ error: 'Comentarios no encontrados' });
  }
});

// Carrito de usuario
app.get('/user_cart/:id.json', (req, res) => {
  const usuarioId = req.params.id;
  const data = readJSON(`data/user_cart/${usuarioId}.json`);
  if (data) {
    res.json(data);
  } else {
    res.status(404).json({ error: "Carrito no encontrado" });
  }
});

// ========================================
// NUEVO ENDPOINT POST /cart
// ========================================
app.post('/cart', (req, res) => {
  try {
    // Obtener datos del carrito desde el body
    const { cliente_id, productos, direccion, tipo_envio, forma_pago } = req.body;

    // Validaciones básicas
    if (!cliente_id) {
      return res.status(400).json({
        success: false,
        error: 'El ID de cliente es obligatorio'
      });
    }

    if (!productos || !Array.isArray(productos) || productos.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Se requiere al menos un producto'
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
        error: 'La dirección de envío está incompleta'
      });
    }

    if (!tipo_envio) {
      return res.status(400).json({
        success: false,
        error: 'El tipo de envío es obligatorio'
      });
    }

    if (!forma_pago) {
      return res.status(400).json({
        success: false,
        error: 'La forma de pago es obligatoria'
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

    // Crear objeto carrito a guardar
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

    // Escribir en el archivo
    fs.writeFileSync(cartFilePath, JSON.stringify(carritos, null, 2));

    console.log('Carrito guardado correctamente:', carrito);

    // Responder con éxito
    res.status(201).json({
      success: true,
      message: 'Carrito guardado correctamente',
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

// Endpoint raíz de la API
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

// POST /login -> recibe { username, password } en el body
app.post('/login', (req, res) => {
  try {
    const { username, password } = req.body || {};

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        error: 'El nombre de usuario y la contraseña son obligatorios'
      });
    }

    // Si existe un archivo de usuarios, validar contra él
    const usersFile = path.join(__dirname, 'data', 'users.json');
    let users = null;
    if (fs.existsSync(usersFile)) {
      try {
        users = JSON.parse(fs.readFileSync(usersFile, 'utf8'));
      } catch (err) {
        console.warn('No se pudo leer o parsear users.json, usando modo de autenticación permisivo');
        users = null;
      }
    }

    let authenticated = false;
    let userRecord = null;

    if (users && Array.isArray(users)) {
      // Formato esperado: [{ username: '...', password: '...', ... }, ...]
      userRecord = users.find(
        u =>
          String(u.username) === String(username) &&
          String(u.password) === String(password)
      );
      authenticated = !!userRecord;
    } else {
      // Sin archivo de usuarios: aceptar cualquier credencial no vacía (modo desarrollo)
      authenticated = true;
      userRecord = { username };
    }

    if (!authenticated) {
      return res.status(401).json({
        success: false,
        error: 'Nombre de usuario o contraseña incorrectos'
      });
    }

    // Generar token JWT
    const payload = {
      username: userRecord.username
      // Se pueden agregar más "claims" si es necesario
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' });

    return res.json({
      success: true,
      token,
      user: { username: userRecord.username }
    });
  } catch (error) {
    console.error('Error en el login:', error);
    return res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
});

// Ejecutar compra
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
