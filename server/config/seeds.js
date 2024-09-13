const mongoose = require('mongoose');
const Book = require('../models/Book');
const Category = require('../models/Category');
const User = require('../models/User');

const dbURI = 'mongodb://localhost:27017/yourDatabaseName';
mongoose.connect(dbURI)
  .then(() => console.log('Database connected'))
  .catch(err => console.log(err));

const seedBooks = async () => {
  try {
    let categories = await Category.find({});
    let users = await User.find({});

    // Seed default categories and users if they don't exist
    if (categories.length === 0) {
      const defaultCategories = [
        { name: 'Programming' },
        { name: 'Software Development' },
        { name: 'Computer Science' }
      ];
      await Category.insertMany(defaultCategories);
      categories = await Category.find({});
      console.log('Default categories seeded');
    }

    if (users.length === 0) {
      const defaultUsers = [
        { firstName: 'John', lastName: 'Doe', email: 'john@example.com', password: 'password123' },
        { firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', password: 'password123' },
        { firstName: 'Alice', lastName: 'Johnson', email: 'alice@example.com', password: 'password123' }
      ];
      await User.insertMany(defaultUsers);
      users = await User.find({});
      console.log('Default users seeded');
    }

    const books = [
      {
        name: 'Introduction to Algorithms',
        author: 'Thomas H. Cormen',
        condition: 'New',
        image: 'https://example.com/image1.jpg',
        price: 50,
        category: categories[0]._id,
        comment: [],
        userId: users[0]._id
      },
      {
        name: 'Clean Code',
        author: 'Robert C. Martin',
        condition: 'Used',
        image: 'https://example.com/image2.jpg',
        price: 30,
        category: categories[1]._id,
        comment: [],
        userId: users[1]._id
      },
      {
        name: 'The Pragmatic Programmer',
        author: 'Andrew Hunt',
        condition: 'Good',
        image: 'https://example.com/image3.jpg',
        price: 40,
        category: categories[2]._id,
        comment: [],
        userId: users[2]._id
      }
    ];

    await Book.insertMany(books);
    console.log('Books seeded successfully');
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close();
  }
};

seedBooks();
