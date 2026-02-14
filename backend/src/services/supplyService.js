import { pool } from '../db/pool.js';
import { createSupplyWithItems } from '../repositories/supplyRepository.js';

export async function registerSupply(payload) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    const supply = await createSupplyWithItems(client, payload);
    await client.query('COMMIT');
    return supply;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}
