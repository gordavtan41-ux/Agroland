-- Установить пароль админа в "admin" (хэш для слова admin).
-- Выполните в pgAdmin в базе agroland один раз.
UPDATE users
SET password = '$2a$10$zGQDpXazdGb3ZfyKdFQjR.inNLhMDK1sdGpYBwCh3TzFNd2M7c01G'
WHERE login = 'admin';
