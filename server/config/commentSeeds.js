const Comment = require('../models/Comment');
const User = require('../models/User');
const Book = require('../models/Book');

const seedComments = async () => {
  const sampleUsers = await User.find(); // Assume users are already seeded
  const sampleBooks = await Book.find(); // Assume books are already seeded

  const comments = [
    {
      comment: 'Amazing book!',
      userId: sampleUsers[0]._id,  // Link to an existing user
      bookId: sampleBooks[0]._id   // Link to an existing book
    },
    {
      comment: 'Not what I expected.',
      userId: sampleUsers[1]._id,
      bookId: sampleBooks[1]._id
    }
  ];

  await Comment.deleteMany({}); // Clear existing comments
  await Comment.insertMany(comments);
  console.log('Comment seeds inserted!');
};

module.exports = seedComments;
