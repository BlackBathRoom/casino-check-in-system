DROP DATABASE IF EXISTS casino;
CREATE DATABASE casino;

USE casino;

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id CHAR(4) PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  fee INT NOT NULL DEFAULT 0,
  nomihodaiEndAt DATETIME NULL DEFAULT NULL,
  isActive BOOLEAN NOT NULL DEFAULT TRUE
);

DROP TABLE IF EXISTS products;
CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  price INT NOT NULL,
  category VARCHAR(10) NOT NULL
);

DROP TABLE IF EXISTS orders;
CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId CHAR(4) NOT NULL,
  productId INT NOT NULL,
  isProvided BOOLEAN NOT NULL DEFAULT FALSE,
  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (productId) REFERENCES products(id)
);

DROP TABLE IF EXISTS ranking;
CREATE TABLE ranking (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId CHAR(4) NOT NULL,
  tip INT NOT NULL DEFAULT 0,
  FOREIGN KEY (userId) REFERENCES users(id)
);

INSERT INTO products (name, price, category) VALUES
('コーラ', 100, 'drink'),
('ジンジャーエール', 100, 'drink'),
('烏龍茶', 100, 'drink'),
('チップ - 200', 100, 'tip'),
('チップ - 800', 300, 'tip');
