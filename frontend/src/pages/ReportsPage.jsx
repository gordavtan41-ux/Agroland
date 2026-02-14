import { useEffect, useState } from 'react';
import { apiRequest } from '../api/client.js';

export function ReportsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    apiRequest('/products').then(setProducts).catch(() => setProducts([]));
  }, []);

  return (
    <section>
      <h2>Отчётность и аналитика</h2>
      <p>Экран для отчётов по остаткам, выручке и доходам по клиентам с экспортом в PDF.</p>
      <h3>Отчёт по остаткам (онлайн)</h3>
      <table>
        <thead>
          <tr>
            <th>Товар</th>
            <th>Остаток</th>
            <th>Мин. остаток</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id_products}>
              <td>{product.name}</td>
              <td>{product.stock_qnt}</td>
              <td>{product.min_balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button">Экспортировать PDF (макет)</button>
    </section>
  );
}
