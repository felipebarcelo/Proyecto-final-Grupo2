-- Crear base de datos
CREATE DATABASE IF NOT EXISTS ecommerce;
USE ecommerce;

-- Tabla Cliente
CREATE TABLE IF NOT EXISTS Cliente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla Categoría
CREATE TABLE IF NOT EXISTS Categoria (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    imagen VARCHAR(255)
);

-- Tabla Producto
CREATE TABLE IF NOT EXISTS Producto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    imagen VARCHAR(255),
    stock INT DEFAULT 0,
    categoria_id INT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (categoria_id) REFERENCES Categoria(id) ON DELETE SET NULL
);

-- Tabla Carrito
CREATE TABLE IF NOT EXISTS Carrito (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado ENUM('activo', 'completado', 'cancelado') DEFAULT 'activo',
    FOREIGN KEY (cliente_id) REFERENCES Cliente(id) ON DELETE CASCADE
);

-- Tabla intermedia Carrito_Producto 
CREATE TABLE IF NOT EXISTS Carrito_Producto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    carrito_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL DEFAULT 1,
    precio_unitario DECIMAL(10, 2) NOT NULL,
    fecha_agregado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (carrito_id) REFERENCES Carrito(id) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES Producto(id) ON DELETE CASCADE
);

-- Tabla Comentario
CREATE TABLE IF NOT EXISTS Comentario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    producto_id INT NOT NULL,
    comentario TEXT NOT NULL,
    puntuacion INT CHECK (puntuacion >= 1 AND puntuacion <= 5),
    fecha_comentario TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES Cliente(id) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES Producto(id) ON DELETE CASCADE
);

-- Índices para mejorar el rendimiento
CREATE INDEX idx_producto_categoria ON Producto(categoria_id);
CREATE INDEX idx_carrito_cliente ON Carrito(cliente_id);
CREATE INDEX idx_comentario_producto ON Comentario(producto_id);
CREATE INDEX idx_comentario_cliente ON Comentario(cliente_id);

-- Datos de ejemplo para Categorías
INSERT INTO Categoria (nombre, descripcion) VALUES 
('Electrónica', 'Productos electrónicos y tecnología'),
('Ropa', 'Vestimenta y accesorios'),
('Hogar', 'Artículos para el hogar');

-- Datos de ejemplo para Productos
INSERT INTO Producto (nombre, descripcion, precio, categoria_id, stock) VALUES 
('Laptop HP', 'Laptop HP 15.6 pulgadas', 45000.00, 1, 10),
('Smartphone Samsung', 'Samsung Galaxy A54', 25000.00, 1, 15),
('Remera Nike', 'Remera deportiva Nike', 1500.00, 2, 50);

-- Datos de ejemplo para Cliente
INSERT INTO Cliente (nombre, email, password) VALUES 
('Juan Pérez', 'juan@example.com', 'password123'),
('María González', 'maria@example.com', 'password456');