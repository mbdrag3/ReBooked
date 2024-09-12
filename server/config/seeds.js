const mongoose = require('mongoose');
const Book = require('./path/to/your/bookModel'); // Adjust the path as needed
const Category = require('./path/to/your/categoryModel'); // Adjust the path as needed
const User = require('./path/to/your/userModel'); // Adjust the path as needed

const dbURI = 'mongodb://localhost:27017/yourDatabaseName'; // Adjust to your database URI
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected'))
  .catch(err => console.log(err));

const seedBooks = async () => {
  try {
    // Make sure categories and users are created first and use their ObjectIds
    const categories = await Category.find({});
    const users = await User.find({});

    const books = [
      {
        name: 'Introduction to Algorithms',
        author: 'Thomas H. Cormen',
        condition: 'New',
        image: 'https://example.com/image1.jpg',
        price: 50,
        category: categories[0]._id,
        comment: [], // Assume comments are created elsewhere
        userId: users[0]._id
      },
      {
        name: 'Clean Code',
        author: 'Robert C. Martin',
        condition: 'Used',
        image: 'https://example.com/image2.jpg',
        price: 30,
        category: categories[1]._id,
        comment: [], // Assume comments are created elsewhere
        userId: users[1]._id
      },
      {
        name: 'The Pragmatic Programmer',
        author: 'Andrew Hunt',
        condition: 'Good',
        image: 'https://example.com/image3.jpg',
        price: 40,
        category: categories[2]._id,
        comment: [], // Assume comments are created elsewhere
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
