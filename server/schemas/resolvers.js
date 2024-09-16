const { User, Book, Category, Order, Comment } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    // Find all categories
    categories: async () => {
      const allCategories = await Category.find()
      console.log(allCategories)
      return allCategories;
    },

    allBooks: async (parent, { category, name }) => {
      return await Book.find();
      },

    // Find books with optional filtering
    getBooksByCategory: async (parent, { category, name }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = {
          $regex: name,
          $options: 'i' // case-insensitive
        };
      }

      return await Book.find(params).populate('category').populate('userId').populate('comment');
    },

    // Single book by ID
    getBookByName: async (parent, { _id }) => {
      return await Book.findById(_id)
        .populate('category')
        .populate('userId')
        .populate({
          path: 'comment',
          populate: {
            path: 'userId',
            select: 'firstName lastName'
          }
        });
    },

    //
    getBookById: async (parent, { _id }) => {
      return await Book.findById(_id)
        .populate('category')
        .populate('userId')
        .populate({
          path: 'comment',
          populate: {
            path: 'userId',
            select: 'firstName lastName'
          }
        });
    },    

    // Find logged-in user
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id)
          .populate({
            path: 'orders.books',
            populate: 'category'
          })
          .populate('comments')
          .populate('books');

        return user;
      }

      throw AuthenticationError;
    },

    // Find an order by ID
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.books',
          populate: 'category'
        });

        return user.orders.id(_id);
      }

      throw AuthenticationError;
    },

    comments: async (parent, { bookId }) => {
      return await Comment.find({ bookId }).populate('userId')
    },

    // Stripe checkout session
    checkout: async (parent, { books }, context) => {
      const url = new URL(context.headers.referer).origin;

      const line_items = [];

      for (let i = 0; i < books.length; i++) {
        const book = await Book.findById(books[i]._id);
        const product = {
          price_data: {
            currency: 'usd',
            product_data: {
              name: book.name,
              description: book.condition,
              images: [`${url}/images/${book.image}`]
            },
            unit_amount: book.price * 100,
          },
          quantity: books[i].purchaseQuantity,
        };
        line_items.push(product);
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });

      return { session: session.id };
    },
  },

  Mutation: {
    // Register a new user
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    // Add an order for logged-in user
    addOrder: async (parent, { books }, context) => {
      if (context.user) {
        const order = new Order({ books, userId: context.user._id });
        await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });
        console.log(order);
        return order;
      }
      throw AuthenticationError;
    },

    addCategory: async (parent, { name }, context) => {
      if (context.user) {  // If you want only authenticated users to add categories
        const newCategory = await Category.create({ name });
        return newCategory;
      }
      throw AuthenticationError;
    },

    addBook: async (parent, { name, author, condition, image, price, category }, context) => {
      if (context.user) {
        const newBook = await Book.create({
          name,
          author,
          condition,
          image,
          price,
          category,
          userId: context.user._id,
        });
  
        return await Book.findById(newBook._id).populate('category');;
      }
  
      throw AuthenticationError;
    },
  

    // Update the current user's details
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }
      throw AuthenticationError;
    },

    addComment: async (parent, { bookId, comment }, context) => {
      if (context.user) {
        const newComment = await Comment.create({
          comment,
          bookId,
          userId: context.user._id,
        });

        await Book.findByIdAndUpdate(bookId, {$push: { comment: newComment._id } })

        return newComment;
      }
      throw AuthenticationError;
    },

    // Update book quantity
    updateBook: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;
      return await Book.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
    },

    // Login a user
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }
      console.log(user);
      const token = signToken(user);

      return { token, user };
    },
  }
};

module.exports = resolvers;
