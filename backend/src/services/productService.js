import { findLowStockProducts, findProducts } from '../repositories/productRepository.js';

export async function getProducts(filters) {
  return findProducts(filters);
}

export async function getLowStockAlerts() {
  return findLowStockProducts();
}
