import { login } from '../services/authService.js';

export async function loginHandler(req, res) {
  try {
    const result = await login(req.body);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
