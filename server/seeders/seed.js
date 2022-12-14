//Create default scenario, staking plan, user and apiconfig data in database
import db from '../config/connection.js';
import { Apisetting, Config, Event, EventType, Market, Result, Runner, Scenario, Staking, System, Transaction, User } from '../models/index.js';

//Import require to ensure importing .json files works in various node versions
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const configSeeds = require('./configSeeds.json');
const scenSeeds = require('./scenSeeds.json');
const stakingSeeds = require('./stakingSeeds.json');

db.once('open', async () => {
  try {
    //Clear database documents of created.
    await Apisetting.deleteMany({});
    await Config.deleteMany({});
    await Event.deleteMany({});
    await EventType.deleteMany({});
    await Market.deleteMany({});
    await Result.deleteMany({});
    await Runner.deleteMany({});
    await Scenario.deleteMany({});
    await Staking.deleteMany({});
    await System.deleteMany({});
    await Transaction.deleteMany({});
    await User.deleteMany({});

    //Create config data
    await Config.create(configSeeds);

    //Create default scenario data
    const scen = await Scenario.create(scenSeeds);
    const scenParams = [
      {
        "label": "Enter Favourite",
        "type": "number",
        "name": "nthFavourite",
        "default": "",
        "value": "",
        "attr": {},
        "desc": "Enter favourite. E.g 1 for 1st, 2 for 2nd etc."
      },
      {
        "label": "Enter Number of Favourites",
        "type": "number",
        "name": "numFavourites",
        "default": "",
        "value": "",
        "attr": {},
        "desc": "Enter number of favorites to bet on. Eg. 2 will bet on the 1st and 2nd favourites."
      },
      {
        "label": "Enter Favourite to Exclude",
        "type": "number",
        "name": "exclude",
        "default": "",
        "value": "",
        "attr": {},
        "desc": "Enter which favourite to skip."
      }
    ]
    const scenString = JSON.stringify(scenParams)

    await Scenario.findOneAndUpdate(
      { scenarioId: "1" },
      { $set: { params: scenString } },
      { runValidators: true, new: true }
    )

    //Create default staking plan data
    const stak = await Staking.create(stakingSeeds);
    const stakeParams = [
      {
        "label": "Stake Amount",
        "type": "currency",
        "name": "stakeAmount",
        "default": 250,
        "value": 250,
        "required": true,
        "attr": {},
        "desc": "Enter the base stake amount to place on each bet"
      },
      {
        "label": "Recovery Option",
        "type": "select",
        "name": "recoveryOption",
        "options": [
          { "value": "none", "text": "None" },
          { "value": "lossRecover", "text": "Loss Recovery" },
          { "value": "profitRecover", "text": "Profit Recovery" }
        ],
        "default": "none",
        "value": "none",
        "required": true,
        "attr": {},
        "desc": "Choose recovery option if required"
      },
      {
        "label": "Order Type For Placed Bets",
        "type": "select",
        "name": "orderType",
        "options": [
          { "value": "limit", "text": "Limit Order" },
          { "value": "limitClose", "text": "Limit On Close Order" },
          { "value": "marketClose", "text": "Market On Close Order" }
        ],
        "default": "limit",
        "value": "limit",
        "required": true,
        "attr": {},
        "desc": "Order types are Limit, Limit On Close or Market On Close"
      },
      {
        "label": "Persistence Type",
        "type": "select",
        "name": "persistanceType",
        "options": [
          { "value": "lapse", "text": "Lapse" },
          { "value": "persist", "text": "Persist" },
          { "value": "marketOnClose", "text": "Market On Close" }
        ],
        "default": "lapse",
        "value": "lapse",
        "required": true,
        "attr": {},
        "desc": "Applies to Limit orders only. Determines what happens when market goes into play. Can be Lapse - Bet cancelled if not matched, Persist - Bet matched in play if possible or Market On Close - Bet set at SP price."
      },
      {
        "label": "Time In Force",
        "type": "select",
        "name": "timeInForce",
        "options": [
          { "value": "", "text": "" },
          { "value": "fillOrKill", "text": "Fill Or Kill" }
        ],
        "default": "",
        "value": "",
        "required": true,
        "attr": {},
        "desc": "Applies to Limit orders only. Overides Persistence. Fill or Kill only option."
      },
      {
        "label": "Bet Target Type",
        "type": "select",
        "name": "betTargetType",
        "options": [
          { "value": "", "text": "" },
          { "value": "payout", "text": "Payout" },
          { "value": "bakersProfit", "text": "Bakers Profit" }
        ],
        "default": "",
        "value": "",
        "required": true,
        "attr": {},
        "desc": "Applies to Limit orders only. Can set so stake is calcualted on achiving a specific payout or profit."
      }
    ]

    const stakString = JSON.stringify(stakeParams)

    await Staking.findOneAndUpdate(
      { stakingId: "1" },
      { $set: { params: stakString } },
      { runValidators: true, new: true }
    )

    //Create a user
    await User.create(
      {
        firstName: 'John',
        lastName: 'smith',
        username: 'johnsmith',
        email: 'johnsmith@gmail.com',
        password: 'password'
      }
    );

    const user = await User.findOne({ username: 'johnsmith' });
    const userId = user._id.toString();

    //Create an apiSettings doc with no data
    const apiSettings = {
      userId: userId,
      apiKeyTest: '',
      testSessionId: '',
      apiUsername: 'johnsmith@gmail.com',
      apiPassword: '',
      certfile: '',
      keyfile: '',
      testApiEnabled: 'true'
    }
    await Apisetting.create(apiSettings);

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});