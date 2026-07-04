const Cart = require('../models/Cart');
const Product = require('../models/Product');

const recalculateCart = async (cart) => {
  let total = 0;
  for (let item of cart.items) {
    const product = await Product.findById(item.product);
    if (product) {
      total += product.price * item.quantity;
    }
  }
  cart.totalPrice = total;
  await cart.save();
  return cart;
};

exports.getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne().populate('items.product', 'name price');
    if (!cart) {
      cart = await Cart.create({ items: [], totalPrice: 0 });
    }
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const qty = Number(quantity) || 1;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    let cart = await Cart.findOne();
    if (!cart) {
      cart = await Cart.create({ items: [], totalPrice: 0 });
    }

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += qty;
    } else {
      
      cart.items.push({ product: productId, quantity: qty });
    }

   
    await recalculateCart(cart);
    
    
    await cart.populate('items.product', 'name price');

    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.updateCartItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({ success: false, message: 'Quantity must be at least 1' });
    }

    const cart = await Cart.findOne();
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex === -1) {
      return res.status(404).json({ success: false, message: 'Item not found in cart' });
    }

    cart.items[itemIndex].quantity = Number(quantity);
    await recalculateCart(cart);
    await cart.populate('items.product', 'name price');

    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne();
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

   
    cart.items = cart.items.filter(item => item.product.toString() !== productId);

    await recalculateCart(cart);
    await cart.populate('items.product', 'name price');

    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart
};
