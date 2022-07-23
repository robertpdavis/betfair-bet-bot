
const BetfairHelper = require('../classes/BetfairHelper');
const bfHelper = new BetfairHelper;

const BetfairTests = require('../classes/BetfairTests');
const bfTests = new BetfairTests;


const intervals = {
  betUpdate: 30,
  keepalive: 3600,
  eventUpdate: 14400
}

const timers = {
  betUpdate: 0,
  keepalive: 0,
  eventUpdate: 0
}

module.exports = {

  scheduler: async function scheduler() {

    //Run the controller every 10 seconds
    setInterval(controller, 10000);

    async function controller() {
      //Adjust the timers for each action
      timers.betUpdate = parseInt(timers.betUpdate) + 10
      timers.keepalive = parseInt(timers.keepalive) + 10
      timers.eventUpdate = parseInt(timers.eventUpdate) + 10

      if (timers.betUpdate >= intervals.betUpdate) {
        //Do marketbook update
        console.log('Marketbook update:' + new Date().toJSON());
        await bfHelper.setSession('62d88c0c9e80cc3ef1a55243');
        console.log(await bfHelper.marketBookUpdate('62d88c0c9e80cc3ef1a55248'));
        timers.betUpdate = 0
      }

      if (timers.keepalive >= intervals.keepalive) {
        //Do keepalive update
        console.log('Keepalive update:' + new Date().toJSON());
        console.log(await bfHelper.apiKeepAlive('62d88c0c9e80cc3ef1a55243'));
        timers.keepalive = 0;
      }

      if (timers.eventUpdate >= intervals.eventUpdate) {
        //Do eventUpdate update
        console.log('Event update:' + new Date().toJSON());
        await bfHelper.setSession('62d88c0c9e80cc3ef1a55243');
        console.log(await bfHelper.eventUpdate('62d88c0c9e80cc3ef1a55243'));
        timers.eventUpdate = 0
      }
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

  // // bfHelper.apiLogin('62d88c0c9e80cc3ef1a55243');
  // console.log(await bfHelper.setSession('62d88c0c9e80cc3ef1a55243'));
  // // console.log(await bfHelper.getEventTypes('62d88c0c9e80cc3ef1a55243'));
  // // console.log(await bfHelper.eventUpdate('62d88c0c9e80cc3ef1a55243'));
  // console.log(await bfHelper.marketBookUpdate('62d88c0c9e80cc3ef1a55248'));
  // console.log(await bfHelper.apiKeepAlive('62d88c0c9e80cc3ef1a55243'));
}

