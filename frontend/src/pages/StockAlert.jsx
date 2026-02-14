import { useEffect, useState } from 'react';
import { apiRequest } from '../api/client.js';

export function StockAlert() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    apiRequest('/products/low-stock').then(setAlerts).catch(() => setAlerts([]));
  }, []);

  return (
    <section>
      <h2>Низкий остаток</h2>
      <ul>
        {alerts.map((product) => (
          <li key={product.id_products}>
            {product.name}: {product.stock_qnt} / минимум {product.min_balance}
          </li>
        ))}
      </ul>
    </section>
  );
}
