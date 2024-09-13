const Order = require('../models/Order');
const User = require('../models/User');
const Book = require('../models/Book');

const seedOrders = async () => {
  const sampleUsers = await User.find(); // Assume users are already seeded
  const sampleBooks = await Book.find(); // Assume books are already seeded

  const orders = [
    {
      purchaseDate: new Date(),
      books: [sampleBooks[0]._id, sampleBooks[1]._id], // Link to books
      userId: sampleUsers[0]._id  // Link to a user
    },
    {
      purchaseDate: new Date(),
      books: [sampleBooks[1]._id],
      userId: sampleUsers[1]._id
    }
  ];

  await Order.deleteMany({}); // Clear existing orders
  await Order.insertMany(orders);
  console.log('Order seeds inserted!');
};

module.exports = seedOrders;
