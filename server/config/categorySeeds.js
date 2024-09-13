const Category = require('../models/Category');

const seedCategories = async () => {
  const categories = [
    { name: 'Math' },
    { name: 'English' },
    { name: 'Science' },
    { name: 'History' }
  ];

  await Category.deleteMany({});
  await Category.insertMany(categories);
  console.log('Category seeds inserted!');
};

module.exports = seedCategories;
