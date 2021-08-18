import express from 'express';
import cors from 'cors';
import { AppRouter } from './AppRouter';
import pool from './config/pool';
import { port } from './config';

import './controllers/ProductController';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(AppRouter.getInstance());

pool.connect(err => {
  if (err) throw new Error('Error while connecting to database');

  console.log('Connected to database');

  app.listen(port, () => {
    console.log(`Server running on port : ${port}`);
  });
});
