# Как запустить проект АгроЛэнд

## Что нужно заранее

- **Node.js** (LTS, например 20+)
- **PostgreSQL** — запущен, база **agroland** создана, выполнены `schema.sql` и `seed.sql` (см. [database-pgadmin-setup.md](database-pgadmin-setup.md))
- **backend/.env** — создан с `PORT` и `DATABASE_URL` (см. пункт 5 в инструкции по БД)

---

## 1. Запуск бэкенда (API)

В терминале:

```bash
cd backend
npm install
npm run dev
```

Должно появиться: `Agroland API started on port 4000`.

- API: **http://localhost:4000**
- Проверка: **http://localhost:4000/health** — в ответе `{"status":"ok"}`

Оставьте этот терминал открытым.

---

## 2. Запуск фронтенда (React)

В **другом** терминале:

```bash
cd frontend
npm install
npm run dev
```

Vite запустит dev-сервер, в консоли будет адрес (обычно **http://localhost:5173**).

Откройте в браузере: **http://localhost:5173**

---

## 3. Что вы увидите

- Форма входа (логин `admin`, пароль из seed — по умолчанию часто `admin`)
- Каталог продукции (данные из БД)
- Блок «Низкий остаток» (товары ниже минимального остатка)

Фронтенд ходит на API по адресу `http://localhost:4000/api` (задан в `frontend/src/api/client.js`).

---

## Кратко

| Часть      | Папка     | Команда       | Адрес              |
|-----------|-----------|---------------|--------------------|
| Backend   | `backend` | `npm run dev` | http://localhost:4000 |
| Frontend  | `frontend`| `npm run dev` | http://localhost:5173 |

Оба процесса должны быть запущены одновременно; PostgreSQL должен быть запущен и база **agroland** создана и заполнена.
