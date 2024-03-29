import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query getuser($username: String!) {
    user(username: $username) {
      _id
      username
      email
      firstName
      lastName
      wallet
      virtualWallet
      maxWallet
      minWallet
      maxVirtualWallet
      minVirtualWallet
      lastLogin
    }
  }
`;

export const QUERY_SYSTEMS = gql`
  query getSystems ($userId: ID!, $isActive: Boolean,  $sortName: String, $sortType: Int, $showArchived: Boolean) {
    systems(userId: $userId, isActive: $isActive, sortName: $sortName, sortType: $sortType, showArchived: $showArchived) {
      _id
      userId
      systemId
      isActive
      isArchived
      title
      description
      isRacingEvent
      scenario {
        _id
        title
        description
        back
        lay
        params
        formName
      }
      stakingPlan {
        _id
        title
        description
        back
        lay
        params
        formName
      }
      scenarioParams
      stakingParams
      mode
      apiMode
      betType
      racingBetType
      setWallet
      raceNumbers
      raceDistance
      raceClass
      matchInPlay
      maxEvents
      maxMarkets
      minOdds
      maxOdds
      maxRunners
      minRunners
      maxBackLayRatio
      maxLiability
      maxBets
      minBets
      minMatched
      maxBookBackBets
      minBookLayBets
      minPlaceWinners
      maxPlaceWinners
      stopLoss
      stopProfit
      maxLosers
      maxWinners
      consecLosers
      consecWinners
      betStartingPrice
      unsettledLimit
      includeCommission
      timeSecsRace
      nthFavourite
      numFavourites
      exclFavourite
      totalEvents
      totalMarkets
      totalBets
      profitLoss
      totalLosers
      totalWinners
      totalConsecLosers
      totalConsecWinners
      unsettledBets
      maxBet
      textQuery
      eventTypeId
      competitionIds
      marketIds
      venues
      bspOnly
      turnInPlayEnabled
      inPlayOnly
      marketBettingTypes
      marketCountries
      marketTypeCodes
      customTime
      marketFromTime
      marketToTime
      withOrders
      raceTypes
      sort
      maxResults
      marketProjection
      lastStarted
      lastStopped
      lastReset
      statusDesc
      ordering
    }
  }
`;

export const QUERY_SINGLE_SYSTEM = gql`
  query getSingleSystem($systemId: ID!) {
    system(id: $systemId) {
      _id
      userId
      systemId
      isActive
      isArchived
      title
      description
      isRacingEvent
      scenario {
        _id
        scenarioId
        title
        description
        back
        lay
        params
        formName
      }
      stakingPlan {
        _id
        stakingId
        title
        description
        back
        lay
        params
        formName
      }
      scenarioParams
      stakingParams
      mode
      apiMode
      betType
      racingBetType
      setWallet
      raceNumbers
      raceDistance
      raceClass
      matchInPlay
      maxEvents
      maxMarkets
      minOdds
      maxOdds
      maxRunners
      minRunners
      maxBackLayRatio
      maxLiability
      maxBets
      minBets
      minMatched
      maxBookBackBets
      minBookLayBets
      minPlaceWinners
      maxPlaceWinners
      stopLoss
      stopProfit
      maxLosers
      maxWinners
      consecLosers
      consecWinners
      betStartingPrice
      unsettledLimit
      includeCommission
      timeSecsRace
      nthFavourite
      numFavourites
      exclFavourite
      totalEvents
      totalMarkets
      totalBets
      profitLoss
      totalLosers
      totalWinners
      totalConsecLosers
      totalConsecWinners
      unsettledBets
      maxBet
      textQuery
      eventTypeId
      competitionIds
      marketIds
      venues
      bspOnly
      turnInPlayEnabled
      inPlayOnly
      marketBettingTypes
      marketCountries
      marketTypeCodes
      customTime
      marketFromTime
      marketToTime
      withOrders
      raceTypes
      sort
      maxResults
      marketProjection
      lastStarted
      lastStopped
      lastReset
      statusDesc
      ordering
    }
  }
`;

export const QUERY_SYSTEM_AG = gql`
  query  getSystemAg($userId: ID!) {
    systemAg(userId: $userId) {
      _id
      sum_events
      sum_markets
      sum_bets
      sum_winners
      sum_losers
      sum_unsettled
      sum_profitloss
    }
  }
`;

export const QUERY_EVENTS = gql`
  query getEvents ($systemId: ID! ) {
    events(systemId: $systemId) {
      _id
      systemId
    eventId
    eventName
    eventTypeId
    countryCode
    timezone
    venue
    openDate
    marketCount
    markets {
      _id
      systemId
      marketId
      marketName
      eventId
      eventName
      marketStartTime
      totalMatched
      competition
      raceNumber
      raceDistance
      raceClass
      persistenceEnabled
      bspMarket
      marketTime
      suspendTime
      settleTime
      bettingType
      turnInPlayEnabled
      marketType
      regulator
      marketBaseRate
      discountAllowed
      wallet
      rules
      rulesHasDate
      eachWayDivisor
      clarifications
      lineRangeInfo
      raceType
      priceLadderDescription
      isMarketDataDelayed
      status
      betDelay
      bspReconciled
      complete
      inplay
      numberOfWinners
      numberOfRunners
      numberOfActiveRunners
      lastMatchTime
      totalAvailable
      crossMatching
      runnersVoidable
      version
    }
    }
  }
`;

export const QUERY_SINGLE_MARKET = gql`
  query getSingleMarket($marketId: String!, $type: String) {
    market(marketId: $marketId, type: $type) {
      _id
      systemId
      marketId
      marketName
      eventId
      eventName
      marketStartTime
      totalMatched
      competition
      raceNumber
      raceDistance
      raceClass
      persistenceEnabled
      bspMarket
      marketTime
      suspendTime
      settleTime
      bettingType
      turnInPlayEnabled
      marketType
      regulator
      marketBaseRate
      discountAllowed
      wallet
      rules
      rulesHasDate
      eachWayDivisor
      clarifications
      lineRangeInfo
      raceType
      priceLadderDescription
      isMarketDataDelayed
      status
      betDelay
      bspReconciled
      complete
      inplay
      numberOfWinners
      numberOfRunners
      numberOfActiveRunners
      lastMatchTime
      totalAvailable
      crossMatching
      runnersVoidable
      version
      runners {
        _id
        systemId
        marketId
        selectionId
        runnerName
        handicap
        sortPriority
        metadata
        status
        adjustmentFactor
        lastPriceTraded
        totalMatched
        removalDate
        spNearPrice
        spFarPrice
        spBackStakeTaken
        spLayLiabilityTaken
        actualSP
        exAvailableToBack
        exAvailableToLay
        exTradedVolume
        matchesByStrategy
        form
      }
    }
  }
`;

export const QUERY_SINGLE_RUNNER = gql`
  query getSingleRunner($runnerId: ID!) {
    runner(id: $runnerId) {
      _id
      systemId
      marketId 
      selectionId
      runnerName
      handicap
      sortPriority
      metadata
      status
      adjustmentFactor
      lastPriceTraded
      totalMatched
      removalDate
      spNearPrice
      spFarPrice
      spBackStakeTaken
      spLayLiabilityTaken
      actualSP
      exAvailableToBack
      exAvailableToLay
      exTradedVolume
      matchesByStrategy
      form
    }
  }
`;

export const QUERY_RESULTS = gql`
  query getResults ($systemId: ID, $userId: ID, $showSystem: Boolean) {
    results(systemId: $systemId, userId: $userId, showSystem: $showSystem ) {
      _id
      userId
      systemId {
        _id,
        systemId
      }
      betId
      customerRef
      betPlaced
      eventId
      eventName
      marketId
      marketName
      selectionId
      selectionName
      orderType
      orderStatus
      betType
      racingBetType
      persistence
      betOutcome
      betStatus
      reqPrice
      priceMatched
      priceReduced
      matchedDate
      size
      sizeMatched
      sizeRemaining
      sizeLapsed
      sizeVoided
      sizeCancelled
      sizeSettled
      settledDate
      commissionperc
      commission
      liability
      profitLoss
      returned
      wallet
      closed
    }
  }
`;

export const QUERY_SINGLE_RESULT = gql`
  query getSingleResult($resultId: ID!) {
    result(id: $resultId) {
      _id
      systemId{
        _id,
        systemId
      }
      betId
      customerRef
      betPlaced
      eventId
      eventName
      marketId
      marketName
      selectionId
      selectionName
      orderType
      orderStatus
      betType
      racingBetType
      persistence
      betOutcome
      betStatus
      reqPrice
      priceMatched
      priceReduced
      matchedDate
      size
      sizeMatched
      sizeRemaining
      sizeLapsed
      sizeVoided
      sizeCancelled
      sizeSettled
      settledDate
      commissionperc
      commission
      liability
      profitLoss
      returned
      wallet
      closed
    }
  }
`;

export const QUERY_SINGLE_API = gql`
  query getSingleApi($userId: ID!) {
    apisetting(userId: $userId) {
      _id
      userId
      apiKeyTest
      testSessionId
      apiKeyLive
      liveSessionId
      apiMode
      apiUsername
      apiPassword
      certfile
      keyfile
      lastTestLogin
      lastTestKeepAlive
      lastTestLogout
      testApiEnabled
      testApiStatus
      lastLiveLogin
      lastLiveKeepAlive
      lastLiveLogout
      liveApiEnabled
      liveApiStatus
      lastTestStatus
      lastLiveStatus
      lastTestMessage
      lastLiveMessage
    }
  }
`;

export const QUERY_EVENT_TYPES = gql`
query getEventTypes {
    eventTypes{
      _id
      eventTypeId
      name
      used
    }
  }
`;