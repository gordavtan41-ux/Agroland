export async function createOrderWithItems(client, { clientId, status, items }) {
  const orderInsert = await client.query(
    `INSERT INTO orders (client_id, order_date, status)
     VALUES ($1, NOW(), $2)
     RETURNING id_orders, client_id, order_date, status`,
    [clientId, status || 'draft'],
  );

  const order = orderInsert.rows[0];

  for (const item of items) {
    await client.query(
      `INSERT INTO order_items (order_id, product_id, quantity)
       VALUES ($1, $2, $3)`,
      [order.id_orders, item.productId, item.quantity],
    );
  }

  return order;
}

export async function getOrderItemsWithStock(client, orderId) {
  const { rows } = await client.query(
    `SELECT oi.product_id, oi.quantity, p.stock_qnt
     FROM order_items oi
     JOIN products p ON p.id_products = oi.product_id
     WHERE oi.order_id = $1`,
    [orderId],
  );

  return rows;
}

export async function completeOrder(client, orderId) {
  const stockRows = await getOrderItemsWithStock(client, orderId);

  for (const row of stockRows) {
    if (Number(row.stock_qnt) < Number(row.quantity)) {
      throw new Error(`Недостаточно остатков по товару ID=${row.product_id}`);
    }
  }

  for (const row of stockRows) {
    await client.query(
      `UPDATE products SET stock_qnt = stock_qnt - $1 WHERE id_products = $2`,
      [row.quantity, row.product_id],
    );
  }

  const { rows } = await client.query(
    `UPDATE orders SET status = 'completed' WHERE id_orders = $1
     RETURNING id_orders, status`,
    [orderId],
  );

  return rows[0];
}
