# Архитектура и модель данных (по утверждённым схемам)

## 1. Общая архитектура
Система строится по клиент-серверной модели:
- **React-клиент** (экранные формы, таблицы, отчёты, печать);
- **Node.js API** (контроллеры, сервисы, репозитории);
- **PostgreSQL** (операционные данные).

Конфигурация и запуск API:
- `appsettings.json`
- `ApiSettings.js`
- `server.js`

## 2. Функциональная схема (роли и операции)

### 2.1 Неавторизованный пользователь
- авторизация;
- получение сообщения об ошибке входа.

### 2.2 Авторизованный пользователь (общие функции)
- поиск продукции в каталоге;
- фильтрация по категориям;
- просмотр уведомлений о низком остатке;
- смена личного пароля;
- выход из системы.

### 2.3 Менеджер
- создание заказа клиента;
- изменение статуса заказа;
- печать накладной на отпуск продукции;
- редактирование данных клиента.

### 2.4 Администратор
- добавление новой продукции;
- регистрация поставки товара;
- печать накладной на приёмку;
- управление пользователями;
- блокировка учётных записей;
- корректировка складских остатков.

### 2.5 Руководитель
- отчёт по остаткам;
- отчёт по выручке;
- анализ доходов по клиентам;
- экспорт аналитики в PDF.

## 3. Даталогическая схема БД (таблицы и поля)

### 3.1 `users`
- `ID_users serial` (PK)
- `login varchar(30)`
- `password varchar(255)`
- `full_name varchar(150)`
- `position varchar(50)`
- `role varchar(30)`
- `status varchar(20)`

### 3.2 `suppliers`
- `ID_suppliers serial` (PK)
- `name varchar(150)`
- `phone varchar(20)`

### 3.3 `clients`
- `ID_clients serial` (PK)
- `name varchar(150)`
- `phone varchar(20)`
- `address varchar(255)`

### 3.4 `products`
- `ID_products serial` (PK)
- `name varchar(150)`
- `category varchar(50)`
- `unit varchar(15)`
- `price numeric(12,2)`
- `stock_qnt numeric(12,2)`
- `min_balance numeric(12,2)`

### 3.5 `supplies`
- `ID_supply serial` (PK)
- `supplier_ID int` (FK → `suppliers`)
- `supply_date timestamp`
- `comment text`

### 3.6 `supply_items`
- `ID_supply_items serial` (PK)
- `supply_id int` (FK → `supplies`)
- `product_id int` (FK → `products`)
- `quantity numeric(12,2)`

### 3.7 `orders`
- `ID_orders serial` (PK)
- `client_id int` (FK → `clients`)
- `order_date timestamp`
- `status varchar(30)`

### 3.8 `order_items`
- `ID_order_items serial` (PK)
- `order_id int` (FK → `orders`)
- `product_id int` (FK → `products`)
- `quantity numeric(12,2)`

## 4. Ключевые связи
- Один поставщик → много поставок.
- Одна поставка → много позиций поставки.
- Один клиент → много заказов.
- Один заказ → много позиций заказа.
- Один товар участвует в позициях поставок и заказов.

## 5. Бизнес-правила остатков
- При регистрации поставки количество увеличивает `products.stock_qnt`.
- При выполнении заказа количество уменьшает `products.stock_qnt`.
- Система запрещает операции, приводящие к отрицательному остатку.
- Товары с остатком ниже `min_balance` выводятся в блок уведомлений.

## 6. Структурная схема модулей (страницы и слои)

### 6.1 Auth-модуль
- `AuthController.js`
- `AuthRepository.js`
- `AuthService.js`
- `User.js`
- `LoginView.jsx`
- `RegisterView.jsx`

### 6.2 Product/Inventory-модуль
- `ProductController.js`
- `ProductRepository.js`
- `InventoryService.js`
- `Product.js`
- `ProductList.jsx`
- `StockAlert.jsx`

### 6.3 Supply-модуль
- `SupplyController.js`
- `SupplyRepository.js`
- `SupplyService.js`
- `SupplyInvoice.pdf`
- `CreateSupply.jsx`

### 6.4 Order-модуль
- `OrderController.js`
- `OrderRepository.js`
- `OrderService.js`
- `Order.js`
- `OrderList.jsx`
- `InvoiceGenerator.js`

### 6.5 Contractor-модуль
- `ContractorController.js`
- `ContractorRepository.js`
- `ContractorService.js`
- `Client.js`
- `Supplier.js`
- `ContractorList.jsx`

### 6.6 Reports-модуль
- `ReportController.js`
- `ReportService.js`
- `StockReport.jsx`
- `RevenueReport.jsx`
- `PDFExportService.js`

### 6.7 Admin-модуль
- `AdminController.js`
- `AdminRepository.js`
- `AdminService.js`
- `UserManagement.jsx`
- `AuditLog.jsx`

### 6.8 Общие UI-компоненты
- `Header.jsx`
- `Sidebar.jsx`
- `Footer.jsx`
- `ErrorViewModel.js`
- `ErrorPage.jsx`
