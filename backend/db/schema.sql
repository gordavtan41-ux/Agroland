CREATE TABLE IF NOT EXISTS users (
  id_users SERIAL PRIMARY KEY,
  login VARCHAR(30) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(150) NOT NULL,
  position VARCHAR(50) NOT NULL,
  role VARCHAR(30) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'active'
);

CREATE TABLE IF NOT EXISTS suppliers (
  id_suppliers SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  phone VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS clients (
  id_clients SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  phone VARCHAR(20),
  address VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS products (
  id_products SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  category VARCHAR(50) NOT NULL,
  unit VARCHAR(15) NOT NULL,
  price NUMERIC(12,2) NOT NULL,
  stock_qnt NUMERIC(12,2) NOT NULL DEFAULT 0,
  min_balance NUMERIC(12,2) NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS supplies (
  id_supply SERIAL PRIMARY KEY,
  supplier_id INT NOT NULL REFERENCES suppliers(id_suppliers),
  supply_date TIMESTAMP NOT NULL,
  comment TEXT
);

CREATE TABLE IF NOT EXISTS supply_items (
  id_supply_items SERIAL PRIMARY KEY,
  supply_id INT NOT NULL REFERENCES supplies(id_supply) ON DELETE CASCADE,
  product_id INT NOT NULL REFERENCES products(id_products),
  quantity NUMERIC(12,2) NOT NULL CHECK (quantity > 0)
);

CREATE TABLE IF NOT EXISTS orders (
  id_orders SERIAL PRIMARY KEY,
  client_id INT NOT NULL REFERENCES clients(id_clients),
  order_date TIMESTAMP NOT NULL,
  status VARCHAR(30) NOT NULL
);

CREATE TABLE IF NOT EXISTS order_items (
  id_order_items SERIAL PRIMARY KEY,
  order_id INT NOT NULL REFERENCES orders(id_orders) ON DELETE CASCADE,
  product_id INT NOT NULL REFERENCES products(id_products),
  quantity NUMERIC(12,2) NOT NULL CHECK (quantity > 0)
);
