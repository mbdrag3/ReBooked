const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  books: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Book'
    }
  ],
  userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
