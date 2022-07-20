const db = require('../config/connection');
const { Apisetting, Config, Event, Market, Result, Runner, Scenario, Staking, System, User } = require('../models');

const configSeeds = require('./configSeeds.json');
const scenSeeds = require('./scenSeeds.json');
const stakingSeeds = require('./stakingSeeds.json');
const sysSeeds = require('./sysSeeds.json');

db.once('open', async () => {
  try {
    await Apisetting.deleteMany({});
    await Config.deleteMany({});
    await Event.deleteMany({});
    await Market.deleteMany({});
    await Result.deleteMany({});
    await Runner.deleteMany({});
    await Scenario.deleteMany({});
    await Staking.deleteMany({});
    await System.deleteMany({});
    await User.deleteMany({});

    await Config.create(configSeeds);
    await Scenario.create(scenSeeds);
    await Staking.create(stakingSeeds);

    await User.create(
      {
        username: 'twobob',
        email: 'robertpdavis@optusnet.com.au',
        password: 'Bootcamp123'
      }
    );

    const user = await User.findOne({ username: 'twobob' });

    const userId = user._id.toString();

    const apiSettings = {
      userId: userId,
      apiKeyTest: ' 7Vidp5zSfcCNyzfl',
      apiUsername: 'robertpdavis@optusnet.com.au',
      apiPassword: 'Augu!972',
      certfile: './classes/certs/client-2048.crt',
      keyfile: './classes/certs/client-2048.key'
    }

    await Apisetting.create(apiSettings);

    sysSeeds[0]['userId'] = userId;

    await System.create(sysSeeds[0]);

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
