# Подключение к БД через pgAdmin

## 1. Установка PostgreSQL и pgAdmin

- Установите [PostgreSQL](https://www.postgresql.org/download/windows/) (в установщике можно включить pgAdmin).
- Либо установите [pgAdmin](https://www.pgadmin.org/download/) отдельно и укажите ему уже установленный сервер PostgreSQL.

После установки PostgreSQL должен быть запущен (служба на порту **5432**).

---

## 2. Подключение к серверу PostgreSQL в pgAdmin

1. Откройте **pgAdmin**.
2. В левой панели **Browser** нажмите правой кнопкой на **Servers** → **Register** → **Server**.
3. Вкладка **General**:
   - **Name:** `Agroland Local` (любое имя для отображения).
4. Вкладка **Connection**:
   - **Host:** `localhost`
   - **Port:** `5432`
   - **Maintenance database:** `postgres`
   - **Username:** `postgres` (или ваш пользователь)
   - **Password:** пароль суперпользователя PostgreSQL (задан при установке).
5. Нажмите **Save** (при необходимости отметьте «Save password»).

После этого в дереве появится ваш сервер. Разверните: **Servers** → **Agroland Local** → **Databases**.

---

## 3. Создание базы данных agroland

1. Правой кнопкой по **Databases** → **Create** → **Database**.
2. **Database:** `agroland`
3. **Owner:** оставьте `postgres` или выберите своего пользователя.
4. Нажмите **Save**.

В списке баз появится **agroland**.

---

## 4. Выполнение schema.sql (создание таблиц)

1. В дереве: **Databases** → **agroland** → правой кнопкой → **Query Tool**.
2. В открывшемся окне нажмите **Open File** (иконка папки) и выберите файл:
   ```
   backend/db/schema.sql
   ```
   (указывайте полный путь к проекту, например: `C:\Users\gorda\OneDrive\Desktop\Agroland\backend\db\schema.sql`)
3. Нажмите **Execute** (F5 или кнопка ▶).
4. Внизу должно быть сообщение об успешном выполнении. Таблицы `users`, `suppliers`, `clients`, `products`, `supplies`, `supply_items`, `orders`, `order_items` созданы.

---

## 5. Выполнение seed.sql (начальные данные)

1. В том же **Query Tool** для базы **agroland**: **File** → **Open** (или новая вкладка) и откройте:
   ```
   backend/db/seed.sql
   ```
2. Нажмите **Execute** (F5).
3. Будут добавлены: пользователь admin, тестовый поставщик, клиент и товары.

---

## 6. Проверка

В pgAdmin:

- **agroland** → **Schemas** → **public** → **Tables** — должны быть все 8 таблиц.
- Правой кнопкой по таблице **users** → **View/Edit Data** → **All Rows** — должна быть запись с логином `admin`.

---

## 7. Подключение бэкенда к БД

В папке `backend` создайте файл **.env** (если его ещё нет), скопировав из `.env.example`:

```env
PORT=4000
DATABASE_URL=postgres://postgres:ВАШ_ПАРОЛЬ@localhost:5432/agroland
```

Замените `ВАШ_ПАРОЛЬ` на пароль пользователя `postgres` (тот же, что в pgAdmin).  
Если пользователь другой — замените и логин в URL:

```env
DATABASE_URL=postgres://ЛОГИН:ПАРОЛЬ@localhost:5432/agroland
```

После этого запуск API (`npm run dev` в `backend`) будет использовать базу **agroland**.

---

## Краткая шпаргалка

| Параметр        | Значение    |
|-----------------|------------|
| Хост            | localhost  |
| Порт            | 5432       |
| Имя базы        | agroland   |
| Пользователь    | postgres   |
| Пароль          | задан при установке PostgreSQL |
