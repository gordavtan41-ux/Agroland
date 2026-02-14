import { getLowStockAlerts, getProducts } from '../services/productService.js';

export async function listProductsHandler(req, res) {
  try {
    const products = await getProducts({
      search: req.query.search,
      category: req.query.category,
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function lowStockHandler(req, res) {
  try {
    const alerts = await getLowStockAlerts();
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
