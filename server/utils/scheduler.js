
const BetfairController = require('../classes/BetfairController');
const bfController = new BetfairController;

const BetfairTests = require('../classes/BetfairTests');
const bfTests = new BetfairTests;


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

  async function controller() {
    //Adjust the timers for each action
    timers.placeBets = parseInt(timers.placeBets) + 5
    timers.betUpdate = parseInt(timers.betUpdate) + 5
    timers.keepalive = parseInt(timers.keepalive) + 5
    timers.eventUpdate = parseInt(timers.eventUpdate) + 5

    if (timers.placeBets >= intervals.placeBets) {
      //Do place bets
      // console.log('Place bets:' + new Date().toJSON());
      await bfController.setSession('62d88c0c9e80cc3ef1a55243');
      // console.log(await bfController.placeBets('62d88c0c9e80cc3ef1a55248'));
      await bfController.placeBets('62d88c0c9e80cc3ef1a55248');
      timers.placeBets = 0
    }

    if (timers.betUpdate >= intervals.betUpdate) {
      //Do bet update
      // console.log('Bet update:' + new Date().toJSON());
      await bfController.setSession('62d88c0c9e80cc3ef1a55243');
      // console.log(await bfController.betUpdate('62d88c0c9e80cc3ef1a55248'));
      await bfController.betUpdate('62d88c0c9e80cc3ef1a55248');
      timers.betUpdate = 0
    }

    if (timers.keepalive >= intervals.keepalive) {
      //Do keepalive update
      console.log('Keepalive update:' + new Date().toJSON());
      console.log(await bfController.apiKeepAlive('62d88c0c9e80cc3ef1a55243'));
      timers.keepalive = 0;
    }

    if (timers.eventUpdate >= intervals.eventUpdate) {
      //Do eventUpdate update
      console.log('Event update:' + new Date().toJSON());
      await bfController.setSession('62d88c0c9e80cc3ef1a55243');
      console.log(await bfController.eventUpdate('62d88c0c9e80cc3ef1a55243'));
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

