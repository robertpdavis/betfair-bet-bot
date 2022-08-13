const { Schema, model } = require('mongoose');

const systemSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  systemId: {
    type: Number,
    required: true
  },
  isActive: {
    type: Boolean,
    required: true,
    default: false
  },
  isArchived: {
    type: Boolean,
    required: true,
    default: false
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  isRacingEvent: {
    type: Boolean,
    required: true,
    default: false
  },
  mode: String,
  scenario: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Scenario',
    }
  ],
  stakingPlan: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Staking',
    }
  ],
  scenarioParams: String,
  stakingParams: String,
  betType: {
    type: String,
    required: true,
    default: 'Back'
  },
  racingBetType: String,
  setWallet: Number,
  raceNumbers: String,
  raceDistance: String,
  raceClass: String,
  matchInPlay: {
    type: Boolean,
    required: true,
    default: false
  },
  maxEvents: {
    type: Number,
    required: true,
    default: 0
  },
  maxMarkets: {
    type: Number,
    required: true,
    default: 0
  },
  minOdds: {
    type: Number,
    required: true,
    default: 0
  },
  maxOdds: {
    type: Number,
    required: true,
    default: 0
  },
  maxRunners: {
    type: Number,
    required: true,
    default: 0
  },
  minRunners: {
    type: Number,
    required: true,
    default: 0
  },
  maxBackLayRatio: {
    type: Number,
    required: true,
    default: 0
  },
  maxLiability: {
    type: Number,
    required: true,
    default: 0
  },
  maxBets: {
    type: Number,
    required: true,
    default: 0
  },
  minBets: {
    type: Number,
    required: true,
    default: 0
  },
  minMatched: {
    type: Number,
    required: true,
    default: 0
  },
  maxBookBackBets: {
    type: Number,
    required: true,
    default: 0
  },
  minBookLayBets: {
    type: Number,
    required: true,
    default: 0
  },
  minPlaceWinners: {
    type: Number,
    required: true,
    default: 0
  },
  maxPlaceWinners: {
    type: Number,
    required: true,
    default: 0
  },
  stopLoss: {
    type: Number,
    required: true,
    default: 0
  },
  stopProfit: {
    type: Number,
    required: true,
    default: 0
  },
  maxLosers: {
    type: Number,
    required: true,
    default: 0
  },
  maxWinners: {
    type: Number,
    required: true,
    default: 0
  },
  consecLosers: {
    type: Number,
    required: true,
    default: 0
  },
  consecWinners: {
    type: Number,
    required: true,
    default: 0
  },
  betStartingPrice: Boolean,
  unsettledLimit: {
    type: Number,
    required: true,
    default: 0
  },
  includeCommission: Boolean,
  timeSecsRace: {
    type: Number,
    required: true,
    default: 30
  },
  nthFavourite: {
    type: Number,
    required: true,
    default: 0
  },
  numFavourites: {
    type: Number,
    required: true,
    default: 0
  },
  exclFavourite: {
    type: Number,
    required: true,
    default: 0
  },
  totalEvents: {
    type: Number,
    required: true,
    default: 0
  },
  totalMarkets: {
    type: Number,
    required: true,
    default: 0
  },
  totalBets: {
    type: Number,
    required: true,
    default: 0
  },
  profitLoss: {
    type: Number,
    required: true,
    default: 0
  },
  totalLosers: {
    type: Number,
    required: true,
    default: 0
  },
  totalWinners: {
    type: Number,
    required: true,
    default: 0
  },
  totalConsecLosers: {
    type: Number,
    required: true,
    default: 0
  },
  totalConsecWinners: {
    type: Number,
    required: true,
    default: 0,
  },
  unsettledBets: {
    type: Number,
    required: true,
    default: 0,
  },
  maxBet: {
    type: Number,
    required: true,
    default: 0,
  },
  textQuery: String,
  eventTypeId: String,
  competitionIds: String,
  marketIds: String,
  venues: String,
  bspOnly: Boolean,
  turnInPlayEnabled: Boolean,
  inPlayOnly: Boolean,
  marketBettingTypes: String,
  marketCountries: String,
  marketTypeCodes: String,
  customTime: Boolean,
  marketFromTime: Date,
  marketToTime: Date,
  withOrders: String,
  raceTypes: String,
  sort: String,
  maxResults: Number,
  marketProjection: String,
  lastStarted: Date,
  lastStopped: Date,
  lastReset: Date,
  lastEventUpdate: Date,
  lastBetUpdate: Date,
  lastBetMade: Date,
  statusDesc: String,
  ordering: Number,
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

const System = model('System', systemSchema);

module.exports = System;
