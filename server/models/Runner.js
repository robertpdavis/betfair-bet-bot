const { Schema, model } = require('mongoose');

const runnerSchema = new Schema({
  systemId: {
    type: String,
    required: true,
  },
  marketId: {
    type: String,
    required: true,
  },
  selectionId: {
    type: String,
    required: true,
  },
  runnerName: String,
  handicap: Number,
  sortPriority: Number,
  metadata: String,
  status: String,
  adjustmentFactor: Number,
  lastPriceTraded: Number,
  totalMatched: Number,
  removalDate: Date,
  spNearPrice: String,
  spFarPrice: String,
  spBackStakeTaken: String,
  spLayLiabilityTaken: String,
  actualSP: String,
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
