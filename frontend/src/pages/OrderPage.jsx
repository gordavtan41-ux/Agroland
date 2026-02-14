import { useState } from 'react';
import { apiRequest } from '../api/client.js';

export function OrderPage() {
  const [clientId, setClientId] = useState('1');
  const [productId, setProductId] = useState('1');
  const [quantity, setQuantity] = useState('10');
  const [status, setStatus] = useState('draft');
  const [orderIdToComplete, setOrderIdToComplete] = useState('');
  const [message, setMessage] = useState('');

  async function createOrder(event) {
    event.preventDefault();
    setMessage('');

    try {
      const order = await apiRequest('/orders', {
        method: 'POST',
        body: JSON.stringify({
          clientId: Number(clientId),
          status,
          items: [{ productId: Number(productId), quantity: Number(quantity) }],
        }),
      });

      setMessage(`Заказ #${order.id_orders} создан со статусом ${order.status}`);
      setOrderIdToComplete(String(order.id_orders));
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function completeOrder() {
    setMessage('');

    try {
      const order = await apiRequest(`/orders/${orderIdToComplete}/complete`, {
        method: 'PATCH',
      });
      setMessage(`Заказ #${order.id_orders} переведён в статус ${order.status}`);
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <section>
      <h2>Управление заказами</h2>
      <form className="stacked-form" onSubmit={createOrder}>
        <label>
          ID клиента
          <input value={clientId} onChange={(e) => setClientId(e.target.value)} />
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
          Статус заказа
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="draft">Черновик</option>
            <option value="processing">В процессе</option>
            <option value="ready">Готов к отгрузке</option>
            <option value="completed">Выполнен</option>
            <option value="cancelled">Отменён</option>
          </select>
        </label>
        <button type="submit">Создать заказ</button>
      </form>

      <div className="inline-form">
        <input
          value={orderIdToComplete}
          onChange={(e) => setOrderIdToComplete(e.target.value)}
          placeholder="ID заказа"
        />
        <button type="button" onClick={completeOrder}>
          Выполнить заказ
        </button>
      </div>

      {message ? <p>{message}</p> : null}
    </section>
  );
}
