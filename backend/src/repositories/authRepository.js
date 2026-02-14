import { pool } from '../db/pool.js';

export async function findUserByLogin(login) {
  const { rows } = await pool.query(
    `SELECT id_users, login, password, full_name, position, role, status FROM users WHERE login = $1`,
    [login],
  );

  return rows[0] || null;
}
