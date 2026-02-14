# АгроЛэнд — система учёта складских запасов, поставок и заказов

Репозиторий содержит документацию учебного проекта ИС ООО «АгроЛэнд», синхронизированную с утверждёнными:
- функциональной схемой;
- даталогической схемой БД;
- структурной схемой модулей и страниц.

## Как запустить проект

1. **БД:** создайте базу `agroland` в PostgreSQL, выполните `backend/db/schema.sql` и `backend/db/seed.sql` ([подробнее](docs/database-pgadmin-setup.md)).
2. **Backend:** в папке `backend`: `npm install` → `npm run dev` (API на http://localhost:4000).
3. **Frontend:** в папке `frontend`: `npm install` → `npm run dev` (сайт на http://localhost:5173).

Подробная инструкция: [docs/run.md](docs/run.md).

## Документация
- [Техническое задание (уточнённое)](docs/technical-specification.md)
- [Архитектура, БД и структура модулей](docs/architecture.md)
- [Пошаговый план реализации](docs/implementation-plan.md)
- [Подключение к БД через pgAdmin](docs/database-pgadmin-setup.md)
- [Как запустить проект](docs/run.md)

## Целевой технологический стек
- **Frontend:** React (JSX)
- **Backend:** Node.js API (Controller/Service/Repository)
- **Database:** PostgreSQL
- **Документы и отчёты:** PDF-генерация
