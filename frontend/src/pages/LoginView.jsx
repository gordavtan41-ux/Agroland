import { useState } from 'react';
import { apiRequest } from '../api/client.js';

export function LoginView() {
  const [login, setLogin] = useState('admin');
  const [password, setPassword] = useState('admin');
  const [message, setMessage] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage('');

    try {
      const user = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ login, password }),
      });

      setMessage(`Вход выполнен: ${user.fullName} (${user.role})`);
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Авторизация</h2>
      <input value={login} onChange={(e) => setLogin(e.target.value)} placeholder="Логин" />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Пароль"
      />
      <button type="submit">Войти</button>
      {message ? <p>{message}</p> : null}
    </form>
  );
}
