import BetfairController from '../classes/BetfairController.js';
import { User, System, Config } from '../models/index.js';

const bfController = new BetfairController;

//Set interval
const interval = 1000; //Every second

//In milliseconds
const intervals = {
  placeBets: 15000,//Every 15 seconds
  betUpdate: 15000,//Every 15 seconds - in between placebets
  keepalive: 3600000,//Every 1 hour
  eventUpdate: 14400000,//Every 4 hours
  eventType: 86400000//Every 24 hours
}

//Setup intial timers
const timers = {
  placeBets: Date.now() + intervals.placeBets,
  betUpdate: Date.now() + intervals.betUpdate + 7000,
  keepalive: Date.now() + intervals.keepalive,
  eventUpdate: Date.now() + intervals.eventUpdate,
  eventType: Date.now() + intervals.eventType
}

export async function scheduler() {

  let showConsole = false;

  //Run the controller every 5 seconds
  setInterval(controller, interval);
  console.log('Scheduler started....');

  async function controller() {

    const timeNow = Date.now();

    //For debugging----
    const result = await Config.find();
    let configs = {};
    result.map((configItem) => {
      configs[configItem.configKey] = configItem.configValue
    })

    if (configs.scheduleDebug === 'true') {
      showConsole = true;
    } else {
      showConsole = false;
    }
    //------


    //Place bets
    if (timers.placeBets <= timeNow) {
      //Reset timer
      timers.placeBets = timeNow + intervals.placeBets;

      //Get all users
      const users = await User.find({});
      if (users.length > 0) {
        //Loop through
        for (let ui = 0; ui < users.length; ui++) {
          const user = users[ui];
          //Get all active systems for user
          const systems = await System.find({ $and: [{ userId: user._id }, { isActive: true }] }).populate('scenario').populate('stakingPlan');
          if (systems.length > 0) {
            await bfController.setSession(user._id);
            //Loop through
            for (let si = 0; si < systems.length; si++) {
              const system = systems[si];
              showConsole ? console.log('Place bets:' + new Date().toJSON()) : '';
              showConsole ? console.log(await bfController.placeBets(user, system)) :
                await bfController.placeBets(user, system);
            }
          }
        }
      }
    }

    //Bet update
    if (timers.betUpdate <= timeNow) {
      //Reset timer
      timers.betUpdate = timeNow + intervals.betUpdate;
      //Get all users
      const users = await User.find({});
      if (users.length > 0) {
        //Loop through
        for (let ui = 0; ui < users.length; ui++) {
          const user = users[ui];
          //Get all systems for user
          const systems = await System.find({ userId: user._id }).populate('scenario').populate('stakingPlan');
          if (systems.length > 0) {
            await bfController.setSession(user._id);
            //Loop through
            for (let si = 0; si < systems.length; si++) {
              const system = systems[si];
              showConsole ? console.log('Bet update:' + new Date().toJSON()) : '';
              showConsole ? console.log(await bfController.betUpdate(user, system)) :
                await bfController.betUpdate(user, system);
            }
          }
        }
      }
    }

    //Keepalive
    if (timers.keepalive <= timeNow) {
      //Reset timer
      timers.keepalive = timeNow + intervals.keepalive;

      //Get all users
      const users = await User.find({});
      if (users.length > 0) {
        for (let ui = 0; ui < users.length; ui++) {
          const user = users[ui];
          showConsole ? console.log('Keepalive update:' + new Date().toJSON()) : '';
          showConsole ? console.log(await bfController.apiKeepAlive(user._id)) :
            await bfController.apiKeepAlive(user._id);
        }
      }
    }

    //Event update
    if (timers.eventUpdate <= timeNow) {
      //Reset timer
      timers.eventUpdate = timeNow + intervals.eventUpdate;

      //Get all users
      const users = await User.find({});
      if (users.length > 0) {
        //Loop through
        for (let ui = 0; ui < users.length; ui++) {
          const user = users[ui];
          //Get all systems for user
          const systems = await System.find({ $and: [{ userId: user._id }, { isActive: true }] });
          if (systems.length > 0) {
            await bfController.setSession(user._id);
            //Loop through
            for (let si = 0; si < systems.length; si++) {
              const system = systems[si];
              showConsole ? console.log('Event update:' + new Date().toJSON()) : '';
              showConsole ? console.log(await bfController.eventUpdate(system._id)) :
                await bfController.eventUpdate(system._id);
            }
          }
        }
      }
    }

    //Event Type Update
    if (timers.eventType <= timeNow) {
      //Reset timer
      timers.eventType = timeNow + intervals.eventType;

      //Get all users
      const users = await User.find({});
      if (users.length > 0) {
        for (let ui = 0; ui < users.length; ui++) {
          const user = users[ui];
          await bfController.setSession(user._id);
          showConsole ? console.log('Event type update:' + new Date().toJSON()) : '';
          showConsole ? console.log(await bfController.getEventTypes()) :
            await bfController.getEventTypes();
        }
      }
    }
  }
};

export async function tests() {
  // bfTests.login();
  // bfTests.getAllEventTypes();
  // bfTests.getEventTypeId('Horse Racing');
  // bfTests.getEvents('7');
  // bfTests.getMarkets('7');
  // bfTests.getMarketBook('7');
  // bfTests.getRunnerBook('1.201149951', '1240449');

  // console.log(await bfController.apiLogin('62d88c0c9e80cc3ef1a55243'));
  // console.log(await bfController.apiLogout('62d88c0c9e80cc3ef1a55243'));
  console.log(await bfController.setSession('62d88c0c9e80cc3ef1a55243'));
  // console.log(await bfController.getEventTypes());
  console.log(await bfController.eventUpdate('62d88c0c9e80cc3ef1a55243'));
  // console.log(await bfController.marketBookUpdate('', '1.201288449', ''));
  // console.log(await bfController.apiKeepAlive('62d88c0c9e80cc3ef1a55243'));
  // console.log(await bfController.betUpdate('62d88c0c9e80cc3ef1a55248'));
  // console.log(await bfController.placeBets('62d88c0c9e80cc3ef1a55248'));

};

