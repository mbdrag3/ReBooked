const mongoose = require('mongoose');
const Book = require('../models/Book');
const User = require('../models/User');
const Category = require('../models/Category'); // Include other models if needed

const wipeData = async () => {
  try {
    // Connect to the database
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/your-database', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Wipe data from each collection
    await Book.deleteMany({});
    await User.deleteMany({});
    await Category.deleteMany({});

    console.log('Data wiped from Book, User, and Category collections.');
    process.exit(0); // Exit the process after wiping data
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

wipeData();
