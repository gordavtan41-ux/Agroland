# План реализации (по модульной структуре проекта)

## Этап 1. Инфраструктура
- Настройка `appsettings.json`, `ApiSettings.js`, `server.js`.
- Подключение PostgreSQL.
- Создание схемы БД и внешних ключей.

## Этап 2. Модули авторизации и пользователей
- `AuthController/AuthService/AuthRepository`.
- Экраны `LoginView.jsx`, `RegisterView.jsx`.
- Роли, статусы учётных записей, блокировка.

## Этап 3. Продукты, поставки, заказы
- Product: каталог, поиск, фильтры, остатки, `StockAlert.jsx`.
- Supply: создание поставки, позиции поставки, приход, `SupplyInvoice.pdf`.
- Order: создание заказа, статусы, расход, `InvoiceGenerator.js`.

## Этап 4. Контрагенты
- Подсистема клиентов/поставщиков (`Contractor*`, `Client.js`, `Supplier.js`).
- CRUD и валидации контактных данных.

## Этап 5. Администрирование
- `AdminController/AdminService/AdminRepository`.
- `UserManagement.jsx`, `AuditLog.jsx`.
- Управление пользователями и контроль действий.

## Этап 6. Отчёты и PDF
- `ReportController`, `ReportService`.
- `StockReport.jsx`, `RevenueReport.jsx`.
- `PDFExportService.js` для выгрузки отчётов.

## Этап 7. UX, навигация и ошибки
- Общие компоненты `Header.jsx`, `Sidebar.jsx`, `Footer.jsx`.
- Ошибки: `ErrorViewModel.js`, `ErrorPage.jsx`.
- Финальная полировка сценариев ролей.

## Этап 8. Тестирование и приёмка
- Проверка ролевой матрицы доступа.
- Проверка целостности остатков при поставках/заказах.
- Проверка формирования отчётов и печатных форм.
- Приёмочные сценарии по ТЗ.
