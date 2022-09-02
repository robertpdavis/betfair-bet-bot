const { gql } = require('apollo-server-express');

const typeDefs = gql`

scalar Date

  type Auth {
      token: ID!
      user: User
    }

  type User {
    _id: ID
    username: String
    email: String
    password: String
    firstName: String
    lastName: String
    wallet: Int
    virtualWallet: Int
    maxWallet: Int
    minWallet: Int
    maxVirtualWallet: Int
    minVirtualWallet: Int
    lastLogin: Date
  }

  type Event {
    _id: ID
    systemId: ID
    eventId: String
    eventName: String
    eventTypeId: String
    countryCode: String
    timezone: String
    venue: String
    openDate: Date
    marketCount: Int
    markets: [Market]
  }

  type EventType {
    _id: ID
    eventTypeId: String
    name: String
    used: Boolean
  }

  type Market {
    _id: ID
    systemId: ID
    marketId: String
    marketName: String
    eventId: String
    eventName: String
    marketStartTime: Date
    totalMatched: Float
    competition: String
    raceNumber: String
    raceDistance: String
    raceClass: String
    persistenceEnabled: Boolean
    bspMarket: Boolean
    marketTime: Date
    suspendTime: Date
    settleTime: Date
    bettingType: String
    turnInPlayEnabled: Boolean
    marketType: String
    regulator: String
    marketBaseRate: Int
    discountAllowed: Boolean
    wallet: String
    rules: String
    rulesHasDate: Boolean
    eachWayDivisor: Float
    clarifications: String
    lineRangeInfo: String
    raceType: String
    priceLadderDescription: String
    isMarketDataDelayed: Boolean
    status: String
    betDelay: Boolean
    bspReconciled: Boolean
    complete: Boolean
    inplay: Boolean
    numberOfWinners: Int
    numberOfRunners: Int
    numberOfActiveRunners: Int
    lastMatchTime: Date
    totalAvailable: Float
    crossMatching: Boolean
    runnersVoidable: Boolean
    version: String
    runners: [Runner]!
  }

  type Runner {
    _id: ID
    systemId: ID
    marketId: String
    selectionId: String
    runnerName: String
    handicap: Int
    sortPriority: Int
    metadata: String
    status: String
    adjustmentFactor: Float
    lastPriceTraded: Float
    totalMatched: Float
    removalDate: Date
    spNearPrice: String
    spFarPrice: String
    spBackStakeTaken: String
    spLayLiabilityTaken: String
    actualSP: String
    exAvailableToBack: String
    exAvailableToLay: String
    exTradedVolume: String
    matchesByStrategy: String
    form: String
  }

  type Result {
    _id: ID
    systemId: ID
    userId: ID
    betId: String
    customerRef: String
    betPlaced: Date
    eventId: String
    eventName: String
    marketId: String
    marketName: String
    selectionId: String
    selectionName: String
    orderType: String
    orderStatus: String
    betType: String
    racingBetType: String
    persistence: String
    betOutcome: String
    betStatus: String
    reqPrice: Int
    priceMatched: Int
    priceReduced: Boolean
    matchedDate: Date
    size: Int
    sizeMatched: Int
    sizeRemaining: Int
    sizeLapsed: Int
    sizeVoided: Int
    sizeCancelled: Int
    sizeSettled: Int
    settledDate: Date
    commissionperc: Int
    commission: Int
    liability: Int
    profitLoss: Int
    returned: Int
    wallet: Int
    closed: Date
  }

  type System {
    _id: ID
    userId: ID
    systemId: Int
    isActive: Boolean
    title: String
    description: String
    isRacingEvent: Boolean
    scenario: [Scenario]!
    stakingPlan: [Staking]!
    scenarioParams: String
    stakingParams: String
    mode: String
    apiMode: String
    betType: String
    racingBetType: String
    setWallet: Int
    raceNumbers: String
    raceDistance: String
    raceClass: String
    matchInPlay: Boolean
    maxEvents: Int
    maxMarkets: Int
    minOdds:Int
    maxOdds: Int
    maxRunners: Int
    minRunners: Int
    maxBackLayRatio: Int
    maxLiability: Int
    maxBets: Int
    minBets: Int
    minMatched: Int
    maxBookBackBets: Int
    minBookLayBets: Int
    minPlaceWinners: Int
    maxPlaceWinners: Int
    stopLoss: Int
    stopProfit: Int
    maxLosers: Int
    maxWinners: Int
    consecLosers: Int
    consecWinners: Int
    betStartingPrice: Boolean
    unsettledLimit: Int
    includeCommission: Boolean
    timeSecsRace: Int
    nthFavourite: Int
    numFavourites: Int
    exclFavourite: Int
    totalEvents: Int
    totalMarkets: Int
    totalBets: Int
    profitLoss: Int
    totalLosers: Int
    totalWinners: Int
    totalConsecLosers: Int
    totalConsecWinners: Int
    unsettledBets: Int
    maxBet: Int
    textQuery: String
    eventTypeId: String
    competitionIds: String
    marketIds: String
    venues: String
    bspOnly: Boolean
    turnInPlayEnabled: Boolean
    inPlayOnly: Boolean
    marketBettingTypes: String
    marketCountries: String
    marketTypeCodes: String
    customTime: Boolean
    marketFromTime: Date
    marketToTime: Date
    withOrders: String
    raceTypes: String
    sort: String
    maxResults: Int
    marketProjection: String
    lastStarted: Date
    lastStopped: Date
    lastReset: Date
    lastEventUpdate: Date
    lastBetMade: Date
    lastBetUpdate: Date
    statusDesc: String
    ordering: Int
  }

  type Scenario {
    _id: ID
    scenarioId: Int
    title: String
    description: String
    back: Boolean
    lay: Boolean
    params: String
    formName: String
  }

  type Staking {
    _id: ID
    stakingId: Int
    title: String
    description: String
    back: Boolean
    lay: Boolean
    params: String
    formName: String
  }

  type Config {
    _id: ID
    configKey: String
    configValue: String
  }

  type Apisetting {
    _id: ID
    userId: ID
    apiKeyTest: String
    testSessionId: String
    apiKeyLive: String
    liveSessionId: String
    apiMode: String
    apiUsername: String
    apiPassword: String
    certfile: String
    keyfile: String
    lastTestLogin: Date
    lastTestKeepAlive: Date
    lastTestLogout:  Date
    testApiEnabled: Boolean
    testApiStatus: Boolean
    lastLiveLogin: Date
    lastLiveKeepAlive: Date
    lastLiveLogout: Date
    liveApiEnabled: Boolean
    liveApiStatus: Boolean
    lastTestStatus: Date
    lastLiveStatus: Date
    lastTestMessage: String
    lastLiveMessage: String
  }

  type Response {
    status: Boolean
    msg: String
  }

  type SysAg {
    _id: ID
    sum_events: Int
    sum_markets: Int
    sum_bets: Int
    sum_winners: Int
    sum_losers: Int
    sum_unsettled: Int
    sum_profitloss: Int
  }

  type Query {
    user(username: String!): User
    systems(userId: ID!, isActive: Boolean, sortName: String, sortType: Int): [System]
    system(id: ID!): System
    systemAg(userId: ID!): SysAg
    events(systemId: ID!): [Event]
    market(marketId: String!, type: String): Market
    runner(id: ID!): Runner
    results(systemId: ID, userId: ID): [Result]
    result(id: ID!): Result
    apisetting(userId: ID!): Apisetting
    eventTypes: [EventType]
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!, firstName: String!, lastName: String!): Auth
    loginUser(username: String!, password: String!): Auth
    updateUser(username: String!, email: String!, password: String!, firstName: String!, lastName: String!
    wallet: Int, virtualWallet: Int, maxWallet: Int, minWallet: Int, maxVirtualWallet: Int, minVirtualWallet: Int
    ): Response
    updateApi(apiKeyTest: String, testSessionId: String, apiKeyLive: String, liveSessionId: String, 
    apiUsername: String, apiPassword: String, certfile: String, keyfile: String ): Response
    apiLogin(userId: ID!, apiType: String!): Response
    apiLogout(userId: ID!, apiType: String!): Response
    enableApi(userId: ID!, apiType: String!): Response
    disableApi(userId: ID!, apiType: String!): Response
    testApi(userId: ID!, apiType: String!): Response
    toggleSystem(systemId: ID!, toggle: String, apiType: String): Response
    updateSystem(
    _id: ID!
    title: String
    description: String
    isRacingEvent: Boolean
    scenario: ID
    stakingPlan: ID
    scenarioParams: String
    stakingParams: String
    mode: String
    apiMode: String
    betType: String
    racingBetType: String
    setWallet: Int
    raceNumbers: String
    raceDistance: String
    raceClass: String
    matchInPlay: Boolean
    maxEvents: Int
    maxMarkets: Int
    minOdds:Int
    maxOdds: Int
    maxRunners: Int
    minRunners: Int
    maxBackLayRatio: Int
    maxLiability: Int
    maxBets: Int
    minBets: Int
    minMatched: Int
    maxBookBackBets: Int
    minBookLayBets: Int
    minPlaceWinners: Int
    maxPlaceWinners: Int
    stopLoss: Int
    stopProfit: Int
    maxLosers: Int
    maxWinners: Int
    consecLosers: Int
    consecWinners: Int
    betStartingPrice: Boolean
    unsettledLimit: Int
    includeCommission: Boolean
    timeSecsRace: Int
    nthFavourite: Int
    numFavourites: Int
    exclFavourite: Int
    totalEvents: Int
    totalMarkets: Int
    totalBets: Int
    profitLoss: Int
    totalLosers: Int
    totalWinners: Int
    totalConsecLosers: Int
    totalConsecWinners: Int
    unsettledBets: Int
    maxBet: Int
    textQuery: String
    eventTypeId: String
    competitionIds: String
    marketIds: String
    venues: String
    bspOnly: Boolean
    turnInPlayEnabled: Boolean
    inPlayOnly: Boolean
    marketBettingTypes: String
    marketCountries: String
    marketTypeCodes: String
    customTime: Boolean
    marketFromTime: Date
    marketToTime: Date
    withOrders: String
    raceTypes: String
    sort: String
    maxResults: Int
    marketProjection: String
    statusDesc: String
    ordering: Int
    ): Response
    resetSystem(systemId: ID!): Response
    copySystem(systemId: ID!): Response
  }
`;

module.exports = typeDefs;
