const db = require('../config/connection');
const { Apisetting, Config, Event, EventType, Market, Result, Runner, Scenario, Staking, System, User } = require('../models');

const configSeeds = require('./configSeeds.json');
const scenSeeds = require('./scenSeeds.json');
const stakingSeeds = require('./stakingSeeds.json');
const sysSeeds = require('./sysSeeds.json');

db.once('open', async () => {
  try {
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
    await User.deleteMany({});

    await Config.create(configSeeds);
    const scen = await Scenario.create(scenSeeds);
    const stak = await Staking.create(stakingSeeds);

    const scenParams = {
      nthFavourite: 0,
      numFavourites: 0,
      exclude: 0
    }
    const scenString = JSON.stringify(scenParams)

    await Scenario.findOneAndUpdate(
      { scenarioId: "1" },
      { $set: { params: scenString } },
      { runValidators: true, new: true }
    )

    const stakeParams = {
      stake: 250,
      recovery: 'none',
      orderType: 'limit',
      persistance: 'lapse',
      timeInForce: 'none'
    }
    const stakString = JSON.stringify(stakeParams)

    await Staking.findOneAndUpdate(
      { stakingId: "1" },
      { $set: { params: stakString } },
      { runValidators: true, new: true }
    )

    await User.create(
      {
        firstName: 'Rob',
        lastName: 'Davis',
        username: 'twobob',
        email: 'robertpdavis@optusnet.com.au',
        password: 'Bootcamp123'
      }
    );

    const user = await User.findOne({ username: 'twobob' });

    const userId = user._id.toString();

    const apiSettings = {
      userId: userId,
      apiKeyTest: '',
      testSessionId: '',
      apiUsername: '',
      apiPassword: '',
      certfile: '',
      keyfile: '',
      testApiEnabled: 'true'
    }

    await Apisetting.create(apiSettings);

    const markproj = ["EVENT", "EVENT_TYPE", "MARKET_START_TIME", "MARKET_DESCRIPTION", "RUNNER_METADATA"]
    const markprojStr = JSON.stringify(markproj)


    sysSeeds[0]['userId'] = userId;

    await System.create(sysSeeds[0]);

    await System.findOneAndUpdate(
      { systemId: "1" },
      { $set: { scenario: scen[0]._id, scenarioParams: scenString, stakingPlan: stak[0]._id, stakingParams: stakString, marketProjection: markprojStr } },
      { runValidators: true, new: true }
    )

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
