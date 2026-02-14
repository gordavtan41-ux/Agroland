import { Router } from 'express';
import { loginHandler } from '../controllers/authController.js';
import { listProductsHandler, lowStockHandler } from '../controllers/productController.js';
import { createSupplyHandler } from '../controllers/supplyController.js';
import { completeOrderHandler, createOrderHandler } from '../controllers/orderController.js';

export const apiRouter = Router();

apiRouter.post('/auth/login', loginHandler);

apiRouter.get('/products', listProductsHandler);
apiRouter.get('/products/low-stock', lowStockHandler);

apiRouter.post('/supplies', createSupplyHandler);

apiRouter.post('/orders', createOrderHandler);
apiRouter.patch('/orders/:id/complete', completeOrderHandler);
