const express = require('express');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());


app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

app.use(errorHandler);

module.exports = app;
