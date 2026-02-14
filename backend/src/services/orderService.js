import { pool } from '../db/pool.js';
import { completeOrder, createOrderWithItems } from '../repositories/orderRepository.js';

export async function createOrder(payload) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    const order = await createOrderWithItems(client, payload);
    await client.query('COMMIT');
    return order;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

export async function markOrderCompleted(orderId) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    const updated = await completeOrder(client, orderId);
    await client.query('COMMIT');
    return updated;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}
