import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dataRoutes from './routes/dataRoutes.js';
import './config/db.js';

const app = express();

// User cors
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use('/api', dataRoutes);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});

export default app;
