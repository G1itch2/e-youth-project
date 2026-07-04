const express = require('express');
const router = express.Router();
const { createProduct, getProducts } = require('../controllers/productController');

router.route('/')
  .get(getProducts)
  .post(createProduct);

module.exports = router;
