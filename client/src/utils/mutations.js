import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation loginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!, $firstName: String!, $lastName: String!) {
    createUser(username: $username, email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($username: String, $email: String, $password: String, $firstName: String, $lastName: String
    $wallet: Int, $virtualWallet: Int, $maxWallet: Int, $minWallet: Int, $maxVirtualWallet: Int, $minVirtualWallet: Int) {
    updateUser(
    username: $username, 
    email: $email,
    password: $password, 
    firstName: $firstName,
    lastName: $lastName 
    wallet: $wallet
    virtualWallet: $virtualWallet
    maxWallet: $maxWallet
    minWallet: $minWallet
    maxVirtualWallet: $maxVirtualWallet
    minVirtualWallet: $minVirtualWallet
      ) {
    status
    msg
    }
  }
`;

export const UPDATE_API = gql`
  mutation updateApi($apiKeyTest: String, $testSessionId: String, $apiKeyLive: String, $liveSessionId: String, 
    $apiUsername: String, $apiPassword: String, $certfile: String, $keyfile: String)
    {
    updateApi(apiKeyTest: $apiKeyTest, testSessionId: $testSessionId, apiKeyLive: $apiKeyLive, liveSessionId: $liveSessionId, 
    apiUsername: $apiUsername, apiPassword: $apiPassword, certfile: $certfile, keyfile: $keyfile)
    {
      status
      msg
    }
  }
`;

export const ENABLE_API = gql`
  mutation enableApi($userId: ID!, $apiType: String!) {
    enableApi(userId: $userId, apiType: $apiType) {
      status
      msg
    }
  }
`;

export const DISABLE_API = gql`
  mutation disableApi($userId: ID!, $apiType: String!) {
    disableApi(userId: $userId, apiType: $apiType) {
      status
      msg
    }
  }
`;

export const TEST_API = gql`
  mutation testApi($userId: ID!, $apiType: String!) {
    testApi(userId: $userId, apiType: $apiType) {
      status
      msg
    }
  }
`;

export const API_LOGIN = gql`
  mutation apiLogin($userId: ID!, $apiType: String!) {
    apiLogin(userId: $userId, apiType: $apiType) {
      status
      msg
    }
  }
`;

export const API_LOGOUT = gql`
  mutation apiLogout($userId: ID!, $apiType: String!) {
    apiLogout(userId: $userId, apiType: $apiType) {
      status
      msg
    }
  }
`;

export const TOGGLE_SYSTEM = gql`
  mutation toggleSystem($systemId: ID!, $toggle: String!, $apiType: String!) {
    toggleSystem(systemId: $systemId, toggle: $toggle, apiType: $apiType) {
      status
      msg
    }
  }
`;

export const CREATE_SYSTEM = gql`
  mutation createSystem($userId: String!) {
    createSystem(userId: $userId) {
      status
      msg
    }
  }
`;

export const UPDATE_SYSTEM = gql`
  mutation updateSystem(
    $_id: ID!
    $title: String
    $description: String
    $isRacingEvent: Boolean
    $scenario: ID
    $stakingPlan: ID
    $scenarioParams: String
    $stakingParams: String
    $mode: String
    $apiMode: String
    $betType: String
    $racingBetType: String
    $setWallet: Int
    $raceNumbers: String
    $raceDistance: String
    $raceClass: String
    $matchInPlay: Boolean
    $maxEvents: Int
    $maxMarkets: Int
    $minOdds:Int
    $maxOdds: Int
    $maxRunners: Int
    $minRunners: Int
    $maxBackLayRatio: Int
    $maxLiability: Int
    $maxBets: Int
    $minBets: Int
    $minMatched: Int
    $maxBookBackBets: Int
    $minBookLayBets: Int
    $minPlaceWinners: Int
    $maxPlaceWinners: Int
    $stopLoss: Int
    $stopProfit: Int
    $maxLosers: Int
    $maxWinners: Int
    $consecLosers: Int
    $consecWinners: Int
    $betStartingPrice: Boolean
    $unsettledLimit: Int
    $includeCommission: Boolean
    $timeSecsRace: Int
    $nthFavourite: Int
    $numFavourites: Int
    $exclFavourite: Int
    $totalEvents: Int
    $totalMarkets: Int
    $totalBets: Int
    $profitLoss: Int
    $totalLosers: Int
    $totalWinners: Int
    $totalConsecLosers: Int
    $totalConsecWinners: Int
    $unsettledBets: Int
    $maxBet: Int
    $textQuery: String
    $eventTypeId: String
    $competitionIds: String
    $marketIds: String
    $venues: String
    $bspOnly: Boolean
    $turnInPlayEnabled: Boolean
    $inPlayOnly: Boolean
    $marketBettingTypes: String
    $marketCountries: String
    $marketTypeCodes: String
    $customTime: Boolean
    $marketFromTime: Date
    $marketToTime: Date
    $withOrders: String
    $raceTypes: String
    $sort: String
    $maxResults: Int
    $marketProjection: String
    $statusDesc: String
    $ordering: Int
  ) {
    updateSystem(
    _id: $_id
    title: $title,
    description: $description,
    isRacingEvent: $isRacingEvent,
    scenario: $scenario,
    stakingPlan: $stakingPlan,
    scenarioParams: $scenarioParams,
    stakingParams: $stakingParams,
    mode: $mode,
    apiMode: $apiMode,
    betType: $betType,
    racingBetType: $racingBetType,
    setWallet: $setWallet,
    raceNumbers: $raceNumbers,
    raceDistance: $raceDistance,
    raceClass: $raceClass,
    matchInPlay: $matchInPlay,
    maxEvents: $maxEvents,
    maxMarkets: $maxMarkets,
    minOdds:$minOdds,
    maxOdds: $maxOdds,
    maxRunners: $maxRunners,
    minRunners: $minRunners,
    maxBackLayRatio: $maxBackLayRatio,
    maxLiability: $maxLiability,
    maxBets: $maxBets,
    minBets: $minBets,
    minMatched: $minMatched,
    maxBookBackBets: $maxBookBackBets,
    minBookLayBets: $minBookLayBets,
    minPlaceWinners: $minPlaceWinners,
    maxPlaceWinners: $maxPlaceWinners,
    stopLoss: $stopLoss,
    stopProfit: $stopProfit,
    maxLosers: $maxLosers,
    maxWinners: $maxWinners,
    consecLosers: $consecLosers,
    consecWinners: $consecWinners,
    betStartingPrice: $betStartingPrice,
    unsettledLimit: $unsettledLimit,
    includeCommission: $includeCommission,
    timeSecsRace: $timeSecsRace,
    nthFavourite: $nthFavourite,
    numFavourites: $numFavourites,
    exclFavourite: $exclFavourite,
    totalEvents: $totalEvents,
    totalMarkets: $totalMarkets,
    totalBets: $totalBets,
    profitLoss: $profitLoss,
    totalLosers: $totalLosers,
    totalWinners: $totalWinners,
    totalConsecLosers: $totalConsecLosers,
    totalConsecWinners: $totalConsecWinners,
    unsettledBets: $unsettledBets,
    maxBet: $maxBet,
    textQuery: $textQuery,
    eventTypeId: $eventTypeId,
    competitionIds: $competitionIds,
    marketIds: $marketIds,
    venues: $venues,
    bspOnly: $bspOnly,
    turnInPlayEnabled: $turnInPlayEnabled,
    inPlayOnly: $inPlayOnly,
    marketBettingTypes: $marketBettingTypes,
    marketCountries: $marketCountries,
    marketTypeCodes: $marketTypeCodes,
    customTime: $customTime,
    marketFromTime: $marketFromTime,
    marketToTime: $marketToTime,
    withOrders: $withOrders,
    raceTypes: $raceTypes,
    sort: $sort,
    maxResults: $maxResults,
    marketProjection: $marketProjection,
    statusDesc: $statusDesc,
    ordering: $ordering ,
    ) {
      status
      msg
    }
  }
`;

export const RESET_SYSTEM = gql`
  mutation resetSystem($systemId: ID!) {
    resetSystem(systemId: $systemId) {
      status
      msg
    }
  }
`;

export const COPY_SYSTEM = gql`
  mutation copySystem($userId: ID!, $systemId: ID!) {
    copySystem(userId: $userId, systemId: $systemId) {
      status
      msg
    }
  }
`;

export const ARCHIVE_SYSTEM = gql`
  mutation archiveSystem($userId: ID!, $systemId: ID!) {
    archiveSystem(userId: $userId, systemId: $systemId) {
      status
      msg
    }
  }
`;