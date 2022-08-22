const { Schema, model } = require('mongoose');

const transactionSchema = new Schema({
  systemId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  transactionType: String,
  transactionDesc: String,
  walletType: String,
  amt: Number,
  balance: Number,
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const Transaction = model('Transaction', transactionSchema);

module.exports = Transaction;
