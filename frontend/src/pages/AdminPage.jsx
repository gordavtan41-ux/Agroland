export function AdminPage() {
  return (
    <section>
      <h2>Администрирование</h2>
      <ul>
        <li>Управление пользователями (роль, статус, блокировка).</li>
        <li>Корректировка остатков и аудит операций.</li>
        <li>Смена пароля и контроль входа.</li>
      </ul>
      <form className="stacked-form">
        <input placeholder="Логин пользователя" />
        <select defaultValue="manager">
          <option value="admin">Администратор</option>
          <option value="manager">Менеджер</option>
          <option value="director">Руководитель</option>
        </select>
        <select defaultValue="active">
          <option value="active">Активен</option>
          <option value="blocked">Заблокирован</option>
        </select>
        <button type="button">Обновить пользователя</button>
      </form>
    </section>
  );
}
