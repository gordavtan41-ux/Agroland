import { createOrder, markOrderCompleted } from '../services/orderService.js';

export async function createOrderHandler(req, res) {
  try {
    const order = await createOrder(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function completeOrderHandler(req, res) {
  try {
    const order = await markOrderCompleted(Number(req.params.id));
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
