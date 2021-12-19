// configure an express server

import express from 'express';
import cors from 'cors';
import restaurants from './api/restaurants.route.js';

const app = express(); // make an express app

app.use(cors());
app.use(express.json()); // server can accept json in the body of the request

app.use('/api/v1/restaurants', restaurants); // set the main route
app.use('*', (req, res) => res.status(404).json({ error: 'not found' })); // set 404 for any other route

export default app;
