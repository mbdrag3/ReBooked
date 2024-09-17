const Book = require('../models/Book');
const Category = require('../models/Category');

const seedBooks = async () => {
  const sampleCategories = await Category.find(); // Fetch seeded categories

  if (sampleCategories.length === 0) {
    throw new Error('No categories found. Seed categories first!');
  }

  const books = [
    {
      name: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      price: 10.99,
      condition: 'New',
      category: sampleCategories[0]._id,
      image: 'https://example.com/image1.jpg' // Replace with actual image URL
    },
    {
      name: '1984',
      author: 'George Orwell',
      price: 8.99,
      condition: 'Used',
      category: sampleCategories[1]._id,
      image: 'https://example.com/image2.jpg' // Replace with actual image URL
    },
    {
      name: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      price: 12.99,
      condition: 'New',
      category: sampleCategories[0]._id,
      image: 'https://example.com/image3.jpg' // Replace with actual image URL
    },
    {
      name: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
      price: 9.49,
      condition: 'Good',
      category: sampleCategories[1]._id,
      image: 'https://example.com/image4.jpg' // Replace with actual image URL
    },
    {
      name: 'Moby-Dick',
      author: 'Herman Melville',
      price: 11.50,
      condition: 'Used',
      category: sampleCategories[2]._id,
      image: 'https://example.com/image5.jpg' // Replace with actual image URL
    },
    {
      name: 'Pride and Prejudice',
      author: 'Jane Austen',
      price: 7.99,
      condition: 'Excellent',
      category: sampleCategories[2]._id,
      image: 'https://example.com/image6.jpg' // Replace with actual image URL
    }
  ];

  // Clear existing books and insert new seeds
  await Book.deleteMany({});
  await Book.insertMany(books);
  console.log('Book seeds inserted!');
};

module.exports = seedBooks;
