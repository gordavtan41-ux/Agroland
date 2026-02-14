INSERT INTO users (login, password, full_name, position, role, status)
VALUES
  ('admin', '$2a$10$zGQDpXazdGb3ZfyKdFQjR.inNLhMDK1sdGpYBwCh3TzFNd2M7c01G', 'Иван Викторович', 'Администратор', 'admin', 'active')
ON CONFLICT (login) DO NOTHING;

INSERT INTO suppliers (name, phone)
VALUES ('ООО Поставщик-А', '+79990000001')
ON CONFLICT DO NOTHING;

INSERT INTO clients (name, phone, address)
VALUES ('ООО Клиент-А', '+79990000002', 'г. Москва')
ON CONFLICT DO NOTHING;

INSERT INTO products (name, category, unit, price, stock_qnt, min_balance)
VALUES
  ('Пшеница', 'Зерно', 'кг', 20.00, 2000.00, 500.00),
  ('Картофель', 'Овощи', 'кг', 35.00, 300.00, 350.00)
ON CONFLICT DO NOTHING;
