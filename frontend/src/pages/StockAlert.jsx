import { useEffect, useState } from 'react';
import { apiRequest } from '../api/client.js';

export function StockAlert() {
  const [alerts, setAlerts] = useState([]);

  async function loadAlerts() {
    const data = await apiRequest('/products/low-stock');
    setAlerts(data);
  }

  useEffect(() => {
    loadAlerts().catch(() => setAlerts([]));
  }, []);

  return (
    <section>
      <h2>Уведомления о низком остатке</h2>
      <button type="button" onClick={() => loadAlerts().catch(() => setAlerts([]))}>
        Обновить
      </button>
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
