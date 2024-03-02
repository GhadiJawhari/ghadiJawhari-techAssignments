const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Payment Schema
const paymentSchema = new Schema({
  // Reference to the User schema
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Reference to the Product schema
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  // Payment details
  paymentMethod: {
    type: String,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed'],
    default: 'Pending'
  },
  // Additional information
  transactionId: {
    type: String
  },
}, { timestamps: true }); 

// Create Payment model
module.exports = mongoose.model('Payment', paymentSchema);

