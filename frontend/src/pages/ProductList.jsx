import { useEffect, useState } from 'react';
import { apiRequest } from '../api/client.js';

export function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    apiRequest('/products').then(setProducts).catch(() => setProducts([]));
  }, []);

  return (
    <section>
      <h2>Каталог продукции</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id_products}>
            {product.name} — {product.stock_qnt} {product.unit}
          </li>
        ))}
      </ul>
    </section>
  );
}
