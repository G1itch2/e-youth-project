const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const mongoose = require('mongoose');
const connectDB = require('./config/db');

const Category = require('./models/Category');
const Product = require('./models/Product');
const Order = require('./models/Order');
const Cart = require('./models/Cart');

const seedDatabase = async () => {
  try {
  
    await connectDB();

    console.log('🧹 Starting cleanup process...');
    
 
    await Order.deleteMany({});
    console.log('🗑️  Orders deleted.');
    
    await Cart.deleteMany({});
    console.log('🗑️  Carts deleted.');
    
    await Product.deleteMany({});
    console.log('🗑️  Products deleted.');
    
    await Category.deleteMany({});
    console.log('🗑️  Categories deleted.');
    
    console.log('🌱 Data cleanup complete. Inserting sample data...');

    const categories = await Category.insertMany([
      { name: 'Electronics' },
      { name: 'Books' },
      { name: 'Clothing' }
    ]);
    console.log(`✅ Added ${categories.length} categories.`);

    const [electronics, books, clothing] = categories;

    const sampleProducts = [
      {
        name: 'Wireless Bluetooth Headphones',
        price: 99.99,
        description: 'High-quality sound with noise-canceling capabilities.',
        category: electronics._id,
        stock: 25
      },
      {
        name: 'Mechanical Gaming Keyboard',
        price: 129.99,
        description: 'RGB backlit tactile mechanical switches for fast typing.',
        category: electronics._id,
        stock: 15
      },
      {
        name: 'The Pragmatic Programmer',
        price: 39.99,
        description: 'Your guide to excellence in software development.',
        category: books._id,
        stock: 50
      },
      {
        name: 'Eloquent JavaScript',
        price: 29.99,
        description: 'A modern introduction to programming.',
        category: books._id,
        stock: 40
      },
      {
        name: 'Classic Cotton T-Shirt',
        price: 19.99,
        description: '100% breathable cotton basic crewneck tee.',
        category: clothing._id,
        stock: 100
      },
      {
        name: 'Slim Fit Denim Jeans',
        price: 49.99,
        description: 'Comfortable everyday stretch denim jeans.',
        category: clothing._id,
        stock: 60
      }
    ];

    const products = await Product.insertMany(sampleProducts);
    
    console.log(`✅ Added ${products.length} products with valid category references.`);
    console.log('🎉 Database seeding completed successfully!');

  } catch (error) {
    console.error(`❌ Seeding failed error log: ${error.message}`);
    process.exit(1);
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
      console.log('🔌 Mongoose disconnected cleanly.');
    }
  }
};

seedDatabase();
