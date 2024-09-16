const mongoose = require('mongoose');
const seedUsers = require('./userSeeds');
const seedBooks = require('./bookSeeds');
const seedCategories = require('./categorySeeds');
const seedComments = require('./commentSeeds');
const seedOrders = require('./orderSeeds'); // Import order seeds


mongoose.connect('mongodb://localhost:27017/reBooked');

const seedAll = async () => {
  try {
    await seedCategories(); // Seed categories first
    await seedBooks();      // Seed books next
    await seedUsers();      // Then seed users
    await seedComments();   // Seed comments after users and books
    await seedOrders();     // Finally, seed orders
    console.log('All seeds inserted!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedAll();
