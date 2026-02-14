import bcrypt from 'bcryptjs';
import { findUserByLogin } from '../repositories/authRepository.js';

export async function login({ login, password }) {
  const user = await findUserByLogin(login);

  if (!user) {
    throw new Error('Неверный логин или пароль');
  }

  if (user.status !== 'active') {
    throw new Error('Учётная запись заблокирована');
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw new Error('Неверный логин или пароль');
  }

  return {
    id: user.id_users,
    login: user.login,
    fullName: user.full_name,
    role: user.role,
  };
}
