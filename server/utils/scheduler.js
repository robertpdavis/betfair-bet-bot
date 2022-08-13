const BetfairController = require('../classes/BetfairController');
const bfController = new BetfairController;
const { User, System } = require('../models');


const intervals = {
  placeBets: 15,
  betUpdate: 30,
  keepalive: 3600,
  eventUpdate: 14400
}

const timers = {
  placeBets: 0,
  betUpdate: 0,
  keepalive: 0,
  eventUpdate: 0
}

async function scheduler() {

  //Run the controller every 5 seconds
  setInterval(controller, 5000);
  console.log('Scheduler started....');

  const showConsole = true;

  async function controller() {
    //Adjust the timers for each action
    timers.placeBets = parseInt(timers.placeBets) + 5
    timers.betUpdate = parseInt(timers.betUpdate) + 5
    timers.keepalive = parseInt(timers.keepalive) + 5
    timers.eventUpdate = parseInt(timers.eventUpdate) + 5

    if (timers.placeBets >= intervals.placeBets) {
      //Do place bets

      //Get all users
      const users = await User.find({});
      //Loop through
      for (let ui = 0; ui < users.length; ui++) {
        const user = users[ui];
        //Get all systems for user
        const systems = await System.find({ userId: (user._id).toString() });
        //Loop through
        for (let si = 0; si < systems.length; si++) {
          const system = systems[si];
          await bfController.setSession(user._id);
          showConsole ? console.log('Place bets:' + new Date().toJSON()) : '';
          showConsole ? console.log(await bfController.placeBets((system._id).toString())) :
            await bfController.placeBets((system._id).toString());
        }
      }
      timers.placeBets = 0
    }

    if (timers.betUpdate >= intervals.betUpdate) {
      //Do bet update
      //Get all users
      const users = await User.find({});
      //Loop through
      for (let ui = 0; ui < users.length; ui++) {
        const user = users[ui];
        //Get all systems for user
        const systems = await System.find({ userId: user._id });
        //Loop through
        for (let si = 0; si < systems.length; si++) {
          const system = systems[si];
          await bfController.setSession(user._id);
          showConsole ? console.log('Bet update:' + new Date().toJSON()) : '';
          showConsole ? console.log(await bfController.betUpdate(system._id)) :
            await bfController.betUpdate(system._id);
        }
      }
      timers.betUpdate = 0
    }

    if (timers.keepalive >= intervals.keepalive) {
      //Do keepalive update
      //Get all users
      const users = await User.find({});
      for (let ui = 0; ui < users.length; ui++) {
        const user = users[ui];
        showConsole ? console.log('Keepalive update:' + new Date().toJSON()) : '';
        showConsole ? console.log(await bfController.apiKeepAlive(user._id)) :
          await bfController.apiKeepAlive(user._id);
      }
      timers.keepalive = 0;
    }

    if (timers.eventUpdate >= intervals.eventUpdate) {
      //Do event update
      //Get all users
      const users = await User.find({});
      //Loop through
      for (let ui = 0; ui < users.length; ui++) {
        const user = users[ui];
        await bfController.setSession(user._id);
        showConsole ? console.log('Event update:' + new Date().toJSON()) : '';
        showConsole ? console.log(await bfController.eventUpdate(user._id)) :
          await bfController.eventUpdate(user._id);
      }
      timers.eventUpdate = 0
    }
  }
}

async function tests() {
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

}

module.exports = { scheduler, tests }

