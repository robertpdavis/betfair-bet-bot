const { Schema, model } = require('mongoose');

const runnerSchema = new Schema({
  systemId: {
    type: Number,
    required: true,
  },
  marketId: {
    type: String,
    required: true,
  },
  selectionId: Number,
  runnerName: String,
  handicap: Number,
  sortPriority: Number,
  metadata: String,
  status: String,
  adjustmentFactor: Number,
  lastPriceTraded: Number,
  totalMatched: Number,
  removalDate: Date,
  spNearPrice: Number,
  spFarPrice: Number,
  spBackStakeTaken: String,
  spLayLiabilityTaken: String,
  actualSP: Number,
  exAvailableToBack: String,
  exAvailableToLay: String,
  exTradedVolume: String,
  matchesByStrategy: String,
  form: String,
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

const Runner = model('Runner', runnerSchema);

module.exports = Runner;
