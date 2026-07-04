const Product = require('../models/Product');


exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, category, stock } = req.body;

    const product = await Product.create({
      name,
      price,
      description,
      category,
      stock
    });

    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const query = {};
    
   
    if (req.query.category) {
      query.category = req.query.category;
    }

    const products = await Product.find(query).populate('category', 'name');
    
    res.status(200).json({ success: true, count: products.length, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createProduct,
  getProducts
};
