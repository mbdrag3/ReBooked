const Book = require('../models/Book');
const Category = require('../models/Category');

const seedBooks = async () => {
  const sampleCategories = await Category.find(); // Fetch seeded categories

  if (sampleCategories.length === 0) {
    throw new Error('No categories found. Seed categories first!');
  }

  const books = [
    {
      name: 'The Great Gatsby',   // Required field
      author: 'F. Scott Fitzgerald',
      price: 10.99,
      stock: 10,
      condition: 'New',           // Required field
      category: sampleCategories[0]._id  // Link to a valid category ID
    },
    {
      name: '1984',               // Required field
      author: 'George Orwell',
      price: 8.99,
      stock: 15,
      condition: 'Used',          // Required field
      category: sampleCategories[1]._id  // Link to another category
    }
  ];

  // Clear existing books and insert new seeds
  await Book.deleteMany({});
  await Book.insertMany(books);
  console.log('Book seeds inserted!');
};

module.exports = seedBooks;
