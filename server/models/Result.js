import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const resultSchema = new Schema({
  systemId: [
    {
      type: Schema.Types.ObjectId,
      ref: 'System',
    }
  ],
  userId: {
    type: Schema.Types.ObjectId,
  },
  betId: String,
  customerRef: String,
  betPlaced: Date,
  eventId: String,
  eventName: String,
  marketId: String,
  marketName: String,
  selectionId: String,
  selectionName: String,
  orderType: String,
  orderStatus: String,
  betType: String,
  racingBetType: String,
  persistence: String,
  betOutcome: String,
  betStatus: String,
  reqPrice: Number,
  priceMatched: Number,
  priceReduced: Boolean,
  matchedDate: Date,
  size: Number,
  sizeMatched: Number,
  sizeRemaining: Number,
  sizeLapsed: Number,
  sizeVoided: Number,
  sizeCancelled: Number,
  sizeSettled: Number,
  settledDate: Date,
  commissionperc: Number,
  commission: Number,
  liability: Number,
  profitLoss: Number,
  returned: Number,
  wallet: Number,
  closed: Date,
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

export default model('Result', resultSchema);

