const { Schema, model } = require('mongoose');

const marketSchema = new Schema({
  systemId: {
    type: String,
    required: true,
  },
  marketId: {
    type: String,
    required: true
  },
  marketName: String,
  eventId: String,
  eventName: String,
  marketStartTime: Date,
  totalMatched: Number,
  competition: String,
  raceNumber: String,
  raceDistance: String,
  raceClass: String,
  persistenceEnabled: Boolean,
  bspMarket: Boolean,
  marketTime: Date,
  suspendTime: Date,
  settleTime: Date,
  bettingType: String,
  turnInPlayEnabled: Boolean,
  marketType: String,
  regulator: String,
  marketBaseRate: Number,
  discountAllowed: Boolean,
  wallet: String,
  rules: String,
  rulesHasDate: Boolean,
  eachWayDivisor: Number,
  clarifications: String,
  lineRangeInfo: String,
  raceType: String,
  priceLadderDescription: String,
  isMarketDataDelayed: Boolean,
  status: String,
  betDelay: Boolean,
  bspReconciled: Boolean,
  complete: Boolean,
  inplay: Boolean,
  numberOfWinners: Number,
  numberOfRunners: Number,
  numberOfActiveRunners: Number,
  lastMatchTime: Date,
  totalAvailable: Number,
  crossMatching: Boolean,
  runnersVoidable: Boolean,
  version: String,
  runners: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Runner',
    }
  ],
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

const Market = model('Market', marketSchema);

module.exports = Market;
