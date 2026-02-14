import { useEffect, useState } from 'react';
import { apiRequest } from '../api/client.js';

export function ProductList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  async function loadProducts() {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (category) params.set('category', category);

    const query = params.toString();
    const path = `/products${query ? `?${query}` : ''}`;
    const data = await apiRequest(path);
    setProducts(data);
  }

  useEffect(() => {
    loadProducts().catch(() => setProducts([]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section>
      <h2>Каталог продукции</h2>
      <form
        className="inline-form"
        onSubmit={(event) => {
          event.preventDefault();
          loadProducts().catch(() => setProducts([]));
        }}
      >
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Поиск по названию" />
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Категория (например, Зерно)"
        />
        <button type="submit">Найти</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Наименование</th>
            <th>Категория</th>
            <th>Цена</th>
            <th>Остаток</th>
            <th>Мин. остаток</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id_products}>
              <td>{product.id_products}</td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.price}</td>
              <td>
                {product.stock_qnt} {product.unit}
              </td>
              <td>{product.min_balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
