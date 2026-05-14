-- =============================================
-- TAREA 1: Estructura inicial de la base de datos
-- Base de datos: queboleta_db
-- =============================================

CREATE DATABASE IF NOT EXISTS queboleta_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE queboleta_db;

-- Tabla base de usuarios (herencia con SINGLE_TABLE)
CREATE TABLE IF NOT EXISTS usuario (
    id_usuario VARCHAR(36) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    rol VARCHAR(20) NOT NULL, -- CLIENTE, ADMINISTRADOR, PERSONAL_ACCESO
    -- Campos de Cliente
    -- Campos de PersonalAcceso
    evento_asignado VARCHAR(36),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de eventos
CREATE TABLE IF NOT EXISTS evento (
    id_evento VARCHAR(36) PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    artista VARCHAR(100) NOT NULL,
    lugar VARCHAR(150) NOT NULL,
    fecha_hora DATETIME NOT NULL,
    sinopsis TEXT,
    precio DOUBLE NOT NULL,
    aforo_disponible INT NOT NULL,
    disponibilidad INT NOT NULL,
    estado VARCHAR(20) NOT NULL DEFAULT 'ACTIVO', -- ACTIVO, CANCELADO, REPROGRAMADO
    enlace VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de entradas
CREATE TABLE IF NOT EXISTS entrada (
    id_entrada VARCHAR(36) PRIMARY KEY,
    codigo_qr VARCHAR(255),
    estado VARCHAR(20) NOT NULL DEFAULT 'ACTIVA', -- ACTIVA, USADA, CANCELADA
    propietario VARCHAR(36) NOT NULL,
    id_evento VARCHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (propietario) REFERENCES usuario(id_usuario),
    FOREIGN KEY (id_evento) REFERENCES evento(id_evento)
);

-- Tabla de transacciones
CREATE TABLE IF NOT EXISTS transaccion (
    id_transaccion VARCHAR(36) PRIMARY KEY,
    fecha DATETIME NOT NULL,
    impuesto DOUBLE NOT NULL,
    total DOUBLE NOT NULL,
    estado BOOLEAN NOT NULL DEFAULT FALSE,
    metodo_pago VARCHAR(20) NOT NULL, -- TARJETA_CREDITO, TARJETA_DEBITO
    id_entrada VARCHAR(36),
    id_usuario VARCHAR(36),
    FOREIGN KEY (id_entrada) REFERENCES entrada(id_entrada),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

-- Tabla de reportes
CREATE TABLE IF NOT EXISTS reporte (
    id_reporte VARCHAR(36) PRIMARY KEY,
    id_evento VARCHAR(36) NOT NULL,
    entradas_vendidas INT DEFAULT 0,
    ingreso_total DOUBLE DEFAULT 0.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_evento) REFERENCES evento(id_evento)
);

-- Tabla de notificaciones
CREATE TABLE IF NOT EXISTS notificacion (
    id_notif VARCHAR(36) PRIMARY KEY,
    tipo_notif VARCHAR(30) NOT NULL, -- CONFIRMACION_COMPRA, RECORDATORIO, REEMBOLSO
    destinatario VARCHAR(100) NOT NULL,
    contenido TEXT,
    estado BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
