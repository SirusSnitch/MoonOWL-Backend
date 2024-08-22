const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [{
    _id: String,
    quantity: Number,
    price: Number
  }],
  userId: String,
  totalPrice: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});



const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
