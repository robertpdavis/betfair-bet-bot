const { Apisetting, Config, Event, EventType, Market, Result, Runner, Scenario, Staking, System, User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { getDefaultSystem } = require('../utils/bfHelpers');
const BetfairController = require('../classes/BetfairController');

const resolvers = {
  Query: {
    user: async (parent, { username }, context) => {
      if (context.user) {
        return await User.findOne({ username });
      }
      throw new AuthenticationError('Not logged in');
    },
    systems: async (parent, { userId, isActive, sortName, sortType, showArchived }) => {
      let qry = { userId: userId }

      isActive === true ? qry.isActive = true : '';
      showArchived === false ? qry.isArchived = false : '';

      const sort = {}
      sort[sortName] = sortType;

      return await System.find(qry).populate('scenario').populate('stakingPlan').sort(sort);
    },
    system: async (parent, args) => {
      return await System.findById(args.id).populate('scenario').populate('stakingPlan');
    },
    systemAg: async (parent, { userId }) => {
      const systemAg = await System.aggregate(
        [
          // { $match: { userId: userId } },
          {
            $group: {
              // Group by null (no additional grouping by id)
              _id: null,
              // Sum of all prices
              sum_events: { $sum: '$totalEvents' },
              sum_markets: { $sum: '$totalMarkets' },
              sum_bets: { $sum: '$totalBets' },
              sum_winners: { $sum: '$totalWinners' },
              sum_losers: { $sum: '$totalLosers' },
              sum_unsettled: { $sum: '$unsettledBets' },
              sum_profitloss: { $sum: '$profitLoss' }
            },
          },
        ],
      )
      return systemAg[0];
    },
    events: async (parent, { systemId }) => {
      const params = systemId ? { systemId } : {};
      return await Event.find(params).populate('markets');
    },
    market: async (parent, args, context) => {

      if (context.user) {
        const betfairController = new BetfairController;
        const type = args.type;

        if (type === 'marketUpdate') {
          const setSession = await betfairController.setSession(context.user._id);
          const marketUpdate = await betfairController.marketBookUpdate('', args.marketId)
        }
        const market = await Market.findOne({ marketId: args.marketId }).populate('runners');

        return market;
      }
      throw new AuthenticationError('Not logged in');
    },
    runner: async (parent, args) => {
      return await Runner.findById(args.id);
    },
    results: async (parent, { systemId, userId }) => {
      const params = systemId ? { systemId } : userId ? { userId } : {};
      return await Result.find(params).sort({ createdAt: -1 });
    },
    result: async (parent, args) => {
      return await Result.findById(args.id);
    },
    apisetting: async (parent, { userId }) => {
      return await Apisetting.findOne({ userId });
    },
    eventTypes: async () => {
      return await EventType.find();
    },
  },

  Mutation: {
    createUser: async (parent, { username, email, password, firstName, lastName }) => {
      const user = await User.create({ username, email, password, firstName, lastName });
      const token = signToken(user);
      return { token, user };
    },
    loginUser: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError('Username or password error');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Username or password error');
      }

      const updateUser = await User.findByIdAndUpdate(
        user._id,
        { $set: { lastLogin: new Date().toJSON() } },
        { runValidators: true, new: true }
      )

      const token = signToken(user);
      return { token, user };
    },
    updateUser: async (parent, { args, context }) => {
      try {
        if (context.user) {

          const userId = context.user._id;
          let status = '';
          let msg = '';

          const updateUser = await User.findByIdAndUpdate(
            userId,
            { $set: args },
            { runValidators: true, new: true }
          )

          status = true;
          msg = 'User update Success'

          return { status, msg };

        } else {
          throw new AuthenticationError('Not logged in');
        }
      } catch (e) {
        throw (e);
      }
    },
    updateApi: async (parent, args, context) => {
      try {
        if (context.user) {

          const userId = context.user._id;
          let status = '';
          let msg = '';

          //Check if any active systems for user first
          const activeSystems = await System.find({ $and: [{ userId: userId }, { isActive: true }] });
          if (activeSystems.length > 0) {
            status = false;
            msg = 'You have active systems. Please disable active systems before updating the api.';
            return { status, msg };
          }

          const result = await Apisetting.findOneAndUpdate(
            { userId: context.user._id },
            { $set: args },
            { runValidators: true, new: true }
          );

          status = true;
          msg = 'API update Success'

          return { status, msg };

        } else {
          throw new AuthenticationError('Not logged in');
        }
      } catch (e) {
        throw (e);
      }
    },
    enableApi: async (parent, args, context) => {
      try {
        if (context.user) {



        } else {
          throw new AuthenticationError('Not logged in');
        }
      } catch (e) {
        throw (e);
      }
    },
    disableApi: async (parent, args, context) => {
      try {
        if (context.user) {



        } else {
          throw new AuthenticationError('Not logged in');
        }
      } catch (e) {
        throw (e);
      }
    },
    testApi: async (parent, args, context) => {
      try {
        if (context.user) {

          const betfairController = new BetfairController;

          const userId = context.user._id;
          const apiType = args.apiType;

          let status = '';
          let msg = '';

          const result = await betfairController.apiKeepAlive(userId)
          console.log(result)

          //If successful, update the database and status
          if (result[0] === true) {
            if (apiType === 'live') {
              data = { liveAPIStatus: true, lastTestKeepAlive: new Date().toJSON(), lastLiveMessage: 'User: API Test Success' };
            } else {
              data = { testAPIStatus: true, lastTestKeepAlive: new Date().toJSON(), testLiveMessage: 'User: API Test Success' };
            }

            const updateResult = await Apisetting.findByIdAndUpdate(
              userId,
              { $set: { data } },
              { runValidators: true, new: true }
            );

            status = true;
            msg = apiType.toUpperCase() + ' API Test Success';

            //If keepalive failed
          } else {

            if (apiType === 'live') {
              data = { liveAPIStatus: false, lastTestKeepAlive: new Date().toJSON(), lastLiveMessage: 'User: API Test Failed. Check API settings.' };
            } else {
              data = { testAPIStatus: false, lastTestKeepAlive: new Date().toJSON(), testLiveMessage: 'User: API Test Failed. Check API settings.' };
            }

            const updateResult = await Apisetting.findByIdAndUpdate(
              userId,
              { $set: { data } },
              { runValidators: true, new: true }
            );


            status = false;
            msg = apiType.toUpperCase() + ' API Test Failed. Check API settings.';

          }
          return { status, msg };

        } else {
          throw new AuthenticationError('Not logged in');
        }
      } catch (e) {
        throw (e);
      }
    },
    apiLogin: async (parent, args, context) => {
      try {
        if (context.user) {



          const betfairController = new BetfairController;

          const userId = context.user._id;
          const apiType = args.apiType;

          let data = '';
          let status = '';
          let msg = '';

          const loginResult = await betfairController.apiLogin(context.user._id);

          //If successful, update the database and status
          if (loginResult[0] === true) {
            if (apiType === 'live') {
              data = { liveAPIStatus: true, lastLiveLogin: new Date().toJSON(), lastLiveMessage: 'User: API Login Success' };
            } else {
              data = { testAPIStatus: true, lastTestLogin: new Date().toJSON(), testLiveMessage: 'User: API Login Success' };
            }

            const updateResult = await Apisetting.findByIdAndUpdate(
              userId,
              { $set: { data } },
              { runValidators: true, new: true }
            );

            status = true;
            msg = apiType.toUpperCase() + ' API Login Success';


          } else {
            status = false;
            msg = loginResult[1];
          }

          return { status, msg };

        } else {
          throw new AuthenticationError('Not logged in');
        }
      } catch (e) {
        throw (e);
      }
    },
    apiLogout: async (parent, args, context) => {
      try {
        if (context.user) {

          const betfairController = new BetfairController;

          const userId = context.user._id;
          const apiType = args.apiType;

          let data = '';
          let status = '';
          let msg = '';

          //Check if any active systems for user first
          const activeSystems = await System.find({ $and: [{ userId: userId }, { isActive: true }] });
          if (activeSystems.length > 0) {
            status = false;
            msg = 'You have active systems. Please disable active systems before logging out';
            return { status, msg };
          }

          const loginResult = await betfairController.apiLogout(context.user._id);

          //If successful, update the database and status
          if (loginResult[0] === true) {
            if (apiType === 'live') {
              data = { liveAPIStatus: false, lastLiveLogout: new Date().toJSON(), lastLiveMessage: 'User: API Logout Success' };
            } else {
              data = { testAPIStatus: false, lastTestLogout: new Date().toJSON(), testLiveMessage: 'User: API Logout Success' };
            }

            const updateResult = await Apisetting.findByIdAndUpdate(
              userId,
              { $set: { data } },
              { runValidators: true, new: true }
            );

            status = true;
            msg = apiType.toUpperCase() + ' API Logout Success';

          } else {
            status = false;
            msg = loginResult[1];
          }

          return { status, msg };

        } else {
          throw new AuthenticationError('Not logged in');
        }
      } catch (e) {
        throw (e);
      }
    },
    toggleSystem: async (parent, args, context) => {
      try {
        if (context.user) {

          const betfairController = new BetfairController;

          const userId = context.user._id;
          const systemId = args.systemId;
          const toggle = args.toggle;
          const apiType = args.apiType;
          let status = '';
          let msg = '';

          if (toggle === 'start') {
            //Do pre-start checks
            //Check API is up
            const result = await betfairController.apiKeepAlive(userId)

            //If failed, update the database and respond
            if (result[0] === false) {

              if (apiType === 'live') {
                data = { liveAPIStatus: false, lastTestKeepAlive: new Date().toJSON(), lastLiveMessage: 'User: API Test Failed. Check API settings.' };
              } else {
                data = { testAPIStatus: false, lastTestKeepAlive: new Date().toJSON(), testLiveMessage: 'User: API Test Failed. Check API settings.' };
              }

              const updateResult = await Apisetting.findByIdAndUpdate(
                userId,
                { $set: { data } },
                { runValidators: true, new: true }
              );
              console.log(result)
              status = false;
              msg = apiType.toUpperCase() + ' API Test Failed. Check API settings.';
              return { status, msg };
            }

            //Update the events for the system
            const setSession = await betfairController.setSession(context.user._id);
            const eventUpdate = await betfairController.eventUpdate(systemId)

            //Check event update completed
            if (eventUpdate[0] === false) {
              //TO DO LOG
              console.log('System start failed. Time: ' + new Date().toJSON());
              status = false;
              msg = eventUpdate[1];
              return { status, msg };
            }

            //Update the system status
            const system = await System.findByIdAndUpdate(
              systemId,
              { $set: { isActive: true, lastStarted: new Date().toJSON(), statusDesc: 'User: System Start' } },
              { runValidators: true, new: true }
            );

            //TO DO LOG
            console.log('System started: ' + systemId + ' Time: ' + new Date().toJSON());

            status = true;
            msg = 'System started';
            return { status, msg };

          } else if (toggle === 'stop') {
            //Update the system status

            const system = await System.findByIdAndUpdate(
              systemId,
              { $set: { isActive: false, lastStopped: new Date().toJSON(), statusDesc: 'User: System Stop' } },
              { runValidators: true, new: true }
            );;

            //TO DO LOG
            console.log('System stopped: ' + systemId + ' Time: ' + new Date().toJSON());

            status = true;
            msg = 'System stopped';
            return { status, msg };
          }
        } else {
          throw new AuthenticationError('Not logged in');
        }
      } catch (e) {
        throw (e);
      }
    },
    updateSystem: async (parent, args, context) => {
      try {
        if (context.user) {
          const systemId = args._id

          //Check if system active
          const system = await System.findById(systemId);
          if (system.isActive === true) {
            const status = false;
            const msg = 'The system is currently active. Stop system to update.';
            return { status, msg }
          }

          const systemUpdate = await System.findByIdAndUpdate(
            systemId,
            { $set: args },
            { runValidators: true, new: true }
          );

          if (systemUpdate) {
            const status = true;
            const msg = 'System updated';
            return { status, msg }
          } else {
            const status = false;
            const msg = 'System update failed';
            return { status, msg }
          }
        } else {
          throw new AuthenticationError('Not logged in');
        }
      } catch (e) {
        throw (e);
      }
    },
    createSystem: async (parent, args, context) => {
      try {
        if (context.user) {

          const userId = context.user._id;
          //Workout the next user system id
          const lastSystem = await System.findOne({ userId: userId }).sort('-systemId');
          const nextSystemId = parseInt(lastSystem.systemId) + 1;

          const newSystem = { ...getDefaultSystem() };

          newSystem.userId = userId;
          newSystem.systemId = nextSystemId;
          newSystem.statusDesc = 'System created';

          const result = await System.create(newSystem);

          if (result) {
            const status = true;
            const msg = 'System created.'
            return { status, msg }
          } else {
            const status = false;
            const msg = 'System create failed'
            return { status, msg }
          }
        } else {
          throw new AuthenticationError('Not logged in');
        }
      } catch (e) {
        throw (e);
      }
    },

    resetSystem: async (parent, args, context) => {
      try {
        if (context.user) {

          const systemId = args.systemId

          //Check if system active
          const system = await System.findById(systemId);
          if (system.isActive === true) {
            const status = false;
            const msg = 'The system is currently active. Stop system to reset stats.';
            return { status, msg }
          }

          const data = {
            totalEvents: 0,
            totalMarkets: 0,
            totalBets: 0,
            profitLoss: 0,
            totalLosers: 0,
            totalWinners: 0,
            totalConsecLosers: 0,
            totalConsecWinners: 0,
            maxBet: 0,
            unsettledBets: 0,
            statusDesc: 'System reset'
          }

          const systemUpdate = await System.findByIdAndUpdate(
            systemId,
            { $set: data },
            { runValidators: true, new: true }
          );

          if (systemUpdate) {
            const status = true;
            const msg = 'System stats reset'
            return { status, msg }
          } else {
            const status = false;
            const msg = 'System reset failed'
            return { status, msg }
          }
        } else {
          throw new AuthenticationError('Not logged in');
        }
      } catch (e) {
        throw (e);
      }
    },

    copySystem: async (parent, args, context) => {
      try {
        if (context.user) {

          const userId = context.user._id;

          const systemId = args.systemId

          //Workout the next user system id
          const lastSystem = await System.findOne({ userId: userId }).sort('-systemId');
          const nextSystemId = parseInt(lastSystem.systemId) + 1;

          //Get system to copy
          const system = await System.findById(systemId);

          const newSystem = { ...system.toObject() };

          //Update fields not to copy
          delete newSystem['_id'];
          delete newSystem['createdAt'];
          delete newSystem['updatedAt'];

          newSystem.title = "Enter name for system"
          newSystem.description = "Enter a description for the system"
          newSystem.systemId = nextSystemId;
          newSystem.ordering = nextSystemId;
          newSystem.isActive = false;
          newSystem.mode = 'Simulated';
          newSystem.totalEvents = 0;
          newSystem.totalMarkets = 0;
          newSystem.totalBets = 0;
          newSystem.profitLoss = 0;
          newSystem.totalLosers = 0;
          newSystem.totalWinners = 0;
          newSystem.totalConsecLosers = 0;
          newSystem.totalConsecWinners = 0;
          newSystem.maxBet = 0;
          newSystem.unsettledBets = 0;
          newSystem.statusDesc = "System created.";
          newSystem.lastStarted = '';
          newSystem.lastStopped = '';
          newSystem.lastEventUpdate = '';
          newSystem.apiMode = 'test';
          newSystem.statusDesc = 'System copied';

          const result = await System.create(newSystem);

          if (result) {
            const status = true;
            const msg = 'System copied'
            return { status, msg }
          } else {
            const status = false;
            const msg = 'System copy failed'
            return { status, msg }
          }
        } else {
          throw new AuthenticationError('Not logged in');
        }
      } catch (e) {
        throw (e);
      }
    },

    archiveSystem: async (parent, args, context) => {
      try {
        if (context.user) {

          const systemId = args.systemId;
          const toggle = args.toggle;

          if (toggle === 'archive') {
            //Check if system active and if already archived
            const system = await System.findById(systemId);
            if (system.isActive === true) {
              const status = false;
              const msg = 'The system is currently active. Stop system to archive.';
              return { status, msg }
            }
            if (system.isArchived === true) {
              const status = false;
              const msg = 'The system is already archived.';
              return { status, msg }
            }
            const systemUpdate = await System.findByIdAndUpdate(
              systemId,
              { $set: { isArchived: true, statusDesc: 'System archived.' } },
              { runValidators: true, new: true }
            );

            if (systemUpdate) {
              const status = true;
              const msg = 'System archived'
              return { status, msg }
            } else {
              const status = false;
              const msg = 'System archive failed'
              return { status, msg }
            }
          } else {
            const systemUpdate = await System.findByIdAndUpdate(
              systemId,
              { $set: { isArchived: false, statusDesc: 'System unarchived.' } },
              { runValidators: true, new: true }
            );

            if (systemUpdate) {
              const status = true;
              const msg = 'System unarchived'
              return { status, msg }
            } else {
              const status = false;
              const msg = 'System unarchive failed'
              return { status, msg }
            }
          }

        } else {
          throw new AuthenticationError('Not logged in');
        }
      } catch (e) {
        throw (e);
      }
    },
  },
};

module.exports = resolvers;
