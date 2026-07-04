const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.checkout = async (req, res) => {
  try {
    const cart = await Cart.findOne().populate('items.product');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ success: false, message: 'Your cart is empty' });
    }

    const orderItems = [];
    let totalAmount = 0;

    for (let item of cart.items) {
      const product = item.product;

      if (!product) {
        return res.status(404).json({ success: false, message: 'One of the products in your cart no longer exists' });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ 
          success: false, 
          message: `Not enough stock for ${product.name}. Available: ${product.stock}` 
        });
      }

      const itemTotal = product.price * item.quantity;
      totalAmount += itemTotal;

      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        priceAtPurchase: product.price
      });
    }

    for (let item of cart.items) {
      await Product.findByIdAndUpdate(item.product._id, {
        $inc: { stock: -item.quantity }
      });
    }

    const order = await Order.create({
      items: orderItems,
      totalAmount
    });

    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();

    res.status(201).json({ 
      success: true, 
      message: 'Order placed successfully', 
      data: order 
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('items.product', 'name');
    res.status(200).json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  checkout,
  getOrders
};
