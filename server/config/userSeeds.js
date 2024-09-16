const User = require('../models/User');
const Book = require('../models/Book');

const seedUsers = async () => {
  // Fetch books that were already seeded
  const sampleBooks = await Book.find(); 

  if (sampleBooks.length === 0) {
    throw new Error('No books found. Seed books first!');
  }

  const users = [
    {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'password123',
      books: [sampleBooks[0]._id, sampleBooks[1]._id]  // Link to books
    },
    {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@example.com',
      password: 'password456',
      books: [sampleBooks[1]._id]  // Link to another book
    }
  ];

  await User.deleteMany({});
  for (const user of users) {
    await User.create(user);
  }
  console.log('User seeds inserted!');
};

module.exports = seedUsers;
