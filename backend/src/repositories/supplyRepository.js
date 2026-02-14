export async function createSupplyWithItems(client, { supplierId, supplyDate, comment, items }) {
  const supplyInsert = await client.query(
    `INSERT INTO supplies (supplier_id, supply_date, comment)
     VALUES ($1, $2, $3)
     RETURNING id_supply, supplier_id, supply_date, comment`,
    [supplierId, supplyDate, comment || null],
  );

  const supply = supplyInsert.rows[0];

  for (const item of items) {
    await client.query(
      `INSERT INTO supply_items (supply_id, product_id, quantity)
       VALUES ($1, $2, $3)`,
      [supply.id_supply, item.productId, item.quantity],
    );

    await client.query(
      `UPDATE products SET stock_qnt = stock_qnt + $1 WHERE id_products = $2`,
      [item.quantity, item.productId],
    );
  }

  return supply;
}
