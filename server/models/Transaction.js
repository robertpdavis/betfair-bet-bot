import mongoose from 'mongoose';
const { Schema, model } = mongoose;

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

export default model('Transaction', transactionSchema);

