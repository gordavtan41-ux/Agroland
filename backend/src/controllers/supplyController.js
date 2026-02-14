import { registerSupply } from '../services/supplyService.js';

export async function createSupplyHandler(req, res) {
  try {
    const supply = await registerSupply(req.body);
    res.status(201).json(supply);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
