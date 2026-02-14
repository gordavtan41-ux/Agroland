import { pool } from '../db/pool.js';

export async function findProducts({ search, category }) {
  const values = [];
  const conditions = [];

  if (search) {
    values.push(`%${search}%`);
    conditions.push(`name ILIKE $${values.length}`);
  }

  if (category) {
    values.push(category);
    conditions.push(`category = $${values.length}`);
  }

  const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const query = `
    SELECT id_products, name, category, unit, price, stock_qnt, min_balance
    FROM products
    ${whereClause}
    ORDER BY name ASC;
  `;

  const { rows } = await pool.query(query, values);
  return rows;
}

export async function findLowStockProducts() {
  const { rows } = await pool.query(`
    SELECT id_products, name, category, unit, stock_qnt, min_balance
    FROM products
    WHERE stock_qnt < min_balance
    ORDER BY name ASC;
  `);

  return rows;
}
