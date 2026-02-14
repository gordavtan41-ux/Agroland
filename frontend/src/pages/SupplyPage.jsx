import { useState } from 'react';
import { apiRequest } from '../api/client.js';

export function SupplyPage() {
  const [supplierId, setSupplierId] = useState('1');
  const [productId, setProductId] = useState('1');
  const [quantity, setQuantity] = useState('100');
  const [comment, setComment] = useState('Плановая поставка');
  const [message, setMessage] = useState('');

  async function createSupply(event) {
    event.preventDefault();
    setMessage('');

    try {
      const supply = await apiRequest('/supplies', {
        method: 'POST',
        body: JSON.stringify({
          supplierId: Number(supplierId),
          supplyDate: new Date().toISOString(),
          comment,
          items: [{ productId: Number(productId), quantity: Number(quantity) }],
        }),
      });

      setMessage(`Поставка #${supply.id_supply} сохранена`);
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <section>
      <h2>Регистрация поставки</h2>
      <form className="stacked-form" onSubmit={createSupply}>
        <label>
          ID поставщика
          <input value={supplierId} onChange={(e) => setSupplierId(e.target.value)} />
        </label>
        <label>
          ID товара
          <input value={productId} onChange={(e) => setProductId(e.target.value)} />
        </label>
        <label>
          Количество
          <input value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        </label>
        <label>
          Комментарий
          <input value={comment} onChange={(e) => setComment(e.target.value)} />
        </label>
        <button type="submit">Сохранить поставку</button>
      </form>
      {message ? <p>{message}</p> : null}
    </section>
  );
}
