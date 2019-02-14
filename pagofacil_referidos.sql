-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-02-2019 a las 07:33:40
-- Versión del servidor: 10.1.37-MariaDB
-- Versión de PHP: 7.3.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `pagofacil_referidos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `transacciones`
--

CREATE TABLE `transacciones` (
  `IdTrx` varchar(20) NOT NULL,
  `Monto` float(11,2) NOT NULL,
  `TipoMoneda` varchar(10) NOT NULL,
  `Detalle` varchar(200) NOT NULL,
  `Comercio` varchar(100) NOT NULL,
  `IdReferidor` varchar(255) NOT NULL,
  `FechaTransaccion` date NOT NULL,
  `Pagada` varchar(1) NOT NULL DEFAULT 'N'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `transacciones`
--

INSERT INTO `transacciones` (`IdTrx`, `Monto`, `TipoMoneda`, `Detalle`, `Comercio`, `IdReferidor`, `FechaTransaccion`, `Pagada`) VALUES
('1-2322-1', 10000.00, 'CLP', 'Compra de productos en un ecommerce', 'Super ecommerce', '0e560610-3001-11e9-84c5-73c68346c609', '2019-01-01', 'N'),
('1-2322-10', 10000.00, 'CLP', 'Compra de productos en un ecommerce', 'Super ecommerce', '9255d660-301b-11e9-95ab-99f10eb3f550', '2019-01-01', 'N'),
('1-2322-11', 20000.00, 'CLP', 'Compra de productos en un ecommerce', 'Super ecommerce', '9255d660-301b-11e9-95ab-99f10eb3f550', '2019-01-10', 'N'),
('1-2322-12', 30000.00, 'CLP', 'Compra de productos en un ecommerce', 'Super ecommerce', '9255d660-301b-11e9-95ab-99f10eb3f550', '2019-01-15', 'N'),
('1-2322-13', 5000.00, 'CLP', 'Compra de productos en un ecommerce', 'Super ecommerce', '9255d660-301b-11e9-95ab-99f10eb3f550', '2019-01-28', 'Y'),
('1-2322-14', 15000.00, 'CLP', 'Compra de productos en un ecommerce', 'Super ecommerce', '9255d660-301b-11e9-95ab-99f10eb3f550', '2019-01-31', 'Y'),
('1-2322-15', 5000.00, 'CLP', 'Compra de productos en un ecommerce', 'Super ecommerce', '9255d660-301b-11e9-95ab-99f10eb3f550', '2019-02-10', 'Y'),
('1-2322-16', 25000.00, 'CLP', 'Compra de productos en un ecommerce', 'Super ecommerce', '9255d660-301b-11e9-95ab-99f10eb3f550', '2019-02-15', 'N'),
('1-2322-17', 20000.00, 'CLP', 'Compra de productos en un ecommerce', 'Super ecommerce', '9255d660-301b-11e9-95ab-99f10eb3f550', '2019-02-20', 'Y'),
('1-2322-2', 5000.00, 'CLP', 'Compra de productos en un ecommerce', 'Super ecommerce', '0e560610-3001-11e9-84c5-73c68346c609', '2019-01-01', 'N'),
('1-2322-3', 15000.00, 'CLP', 'Compra de productos en un ecommerce', 'Super ecommerce', '0e560610-3001-11e9-84c5-73c68346c609', '2019-01-01', 'N'),
('1-2322-4', 20000.00, 'CLP', 'Compra de productos en un ecommerce', 'Super ecommerce', '0e560610-3001-11e9-84c5-73c68346c609', '2019-01-01', 'Y'),
('1-2322-5', 10000.00, 'CLP', 'Compra de productos en un ecommerce', 'Super ecommerce', '0e560610-3001-11e9-84c5-73c68346c609', '2019-01-01', 'N');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` varchar(255) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `Apellido` varchar(100) NOT NULL,
  `DocumentoIdentidad` varchar(100) NOT NULL,
  `TipoDocumento` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `DOB` varchar(100) NOT NULL,
  `Sexo` varchar(100) NOT NULL,
  `NombreBanco` varchar(100) DEFAULT NULL,
  `NumeroCuenta` varchar(100) DEFAULT NULL,
  `TipoCuenta` varchar(100) DEFAULT NULL,
  `Comision` float(11,2) NOT NULL DEFAULT '0.00',
  `Status` varchar(10) NOT NULL DEFAULT 'PENDIENTE',
  `EmailContactoBanco` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `Nombre`, `Apellido`, `DocumentoIdentidad`, `TipoDocumento`, `Email`, `Password`, `DOB`, `Sexo`, `NombreBanco`, `NumeroCuenta`, `TipoCuenta`, `Comision`, `Status`, `EmailContactoBanco`) VALUES
('0e560610-3001-11e9-84c5-73c68346c609', 'Miguel', 'Farias', '1234567843', 'RUT', 'mi@maildementira.cl', 'asdfqazwsx', '01011970', 'M', 'Banco Estado', '12333249', 'Cuenta Corriente', 0.10, 'ACTIVO', 'mi@maildementira.cl'),
('9255d660-301b-11e9-95ab-99f10eb3f550', 'Pedro', 'Alarcon', '1234567843', 'RUT', 'mi@maildementira.cl', 'asdfqasdasdasdazwsx', '01011970', 'M', 'Banco Estado', '12331233249', 'Cuenta Corriente', 0.20, 'ACTIVO', 'mi@maildementira.cl');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `transacciones`
--
ALTER TABLE `transacciones`
  ADD PRIMARY KEY (`IdTrx`),
  ADD UNIQUE KEY `IdTrx` (`IdTrx`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
