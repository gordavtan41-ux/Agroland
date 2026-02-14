import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { apiRouter } from './routes/index.js';
import { config } from './config.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/health', (_, res) => {
  res.json({ status: 'ok' });
});

app.use('/api', apiRouter);

app.use((error, _, res, __) => {
  res.status(500).json({ message: error.message || 'Internal server error' });
});

app.listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.log(`Agroland API started on port ${config.port}`);
});
