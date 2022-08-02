const { Apisetting, Config, Event, EventType, Market, Result, Runner, Scenario, Staking, System, User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const BetfairController = require('../classes/BetfairController');

const resolvers = {
  Query: {
    user: async (parent, { username }, context) => {
      if (context.user) {
        return await User.findOne({ username });
      }
      throw new AuthenticationError('Not logged in');
    },
    systems: async (parent, { userId }) => {
      return await System.find({ userId }).populate('scenario').populate('stakingPlan');
    },
    system: async (parent, args) => {
      return await System.findById(args.id).populate('scenario').populate('stakingPlan');
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
    results: async (parent, { systemId }) => {
      const params = systemId ? { systemId } : {};
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
        throw new AuthenticationError('No user found with this username');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const updateUser = await User.findByIdAndUpdate(
        user._id,
        { $set: { lastLogin: new Date().toJSON() } },
        { runValidators: true, new: true }
      )

      const token = signToken(user);
      return { token, user };
    },
    updateApi: async (parent, args, context) => {
      try {
        if (context.user) {
          //TO DO check if API enabled first

          const data = args.data;

          const api = await Apisetting.findOneAndUpdate(
            { userId: context.user._id },
            { $set: { data } },
            { runValidators: true, new: true }
          );

          const status = true;
          const msg = 'Success'

          return { status, msg };
        } else {
          throw new AuthenticationError('Not logged in');
        }
      } catch (e) {
        throw (e);
      }
    },
    toggleApi: async (parent, args, context) => {
      try {
        if (context.user) {

          const betfairController = new BetfairController;

          const userId = context.user._id;
          const api = args.api;
          const toggle = args.toggle;

          let ApiEnabled = ''
          let msg = ''

          const data = '';
          if (api === live) {
            if (toggle === 'enable') {
              data = { liveAPIEnabled: true, lastLiveMessage: 'User: API Enable' }
            } else {
              data = { liveAPIEnabled: false, lastLiveMessage: 'User: API Disable' }
            }
          } else {
            if (toggle === 'disable') {
              data = { testAPIEnabled: true, lastTestMessage: 'User: API Enable' }
            } else {
              data = { testAPIEnabled: false, lastTestMessage: 'User: API Disable' }
            }
          }

          const apiUpdate = await Apisetting.findByIdAndUpdate(
            userId,
            { $set: { data } },
            { runValidators: true, new: true }
          );

          if (apiUpdate) {
            ApiEnabled = true;
            msg = 'API enabled';
          } else {
            ApiEnabled = false;
            msg = 'API enable failed';
          }
          return { api, ApiEnabled, msg };

        } else {
          throw new AuthenticationError('Not logged in');
        }
      } catch (e) {
        throw (e);
      }
    },
    toggleApiLogin: async (parent, args, context) => {
      try {
        if (context.user) {

          const betfairController = new BetfairController;

          const userId = context.user._id;
          const api = args.api;
          const toggle = args.toggle;

          let result = '';
          let data = '';
          let apiStatus = '';
          let msg = '';

          if (toggle === 'login') {

            result = await betfairController.apiLogin(context.user._id);

            if (result[0] === true) {
              if (api === 'live') {
                data = { liveAPIStatus: true, lastLiveLogin: new Date().toJSON(), lastLiveMessage: 'User: API Login Success' };
              } else {
                data = { testAPIStatus: true, lastTestLogin: new Date().toJSON(), testLiveMessage: 'User: API Login Success' };
              }
              apiStatus = true;
              msg = 'API Login Success';

            } else {
              apiStatus = false;
              msg = 'API Login failed';
            }
          } else if (toggle === 'logout') {

            result = await betfairController.apiLogout(context.user._id);

            if (result[0] === true) {
              if (api === 'live') {
                data = { liveAPIStatus: false, lastLiveLogin: new Date().toJSON(), lastLiveMessage: 'User: API Logout Success' };
              } else {
                data = { testAPIStatus: false, lastTestLogin: new Date().toJSON(), testLiveMessage: 'User: API Logout Success' };
              }
              apiStatus = true;
              msg = 'API Logout Success';

            } else {
              apiStatus = false;
              msg = 'API Logout failed';
            }
          }

          if (result[0] === true) {
            const apiUpdate = await Apisetting.findByIdAndUpdate(
              userId,
              { $set: { data } },
              { runValidators: true, new: true }
            );

            return { api, apiStatus, msg }
          } else {
            return { api, apiStatus, msg }
          }

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

          const systemId = args.systemId;
          const toggle = args.toggle;

          if (toggle === 'start') {
            //Update the events for the system
            const setSession = await betfairController.setSession(context.user._id);
            const eventUpdate = await betfairController.eventUpdate('', systemId)

            //Update the system status
            if (eventUpdate[0]) {
              const system = await System.findByIdAndUpdate(
                systemId,
                { $set: { isActive: true, lastStarted: new Date().toJSON(), statusDesc: 'User: System Start' } },
                { runValidators: true, new: true }
              );

              const isActive = system.isActive;
              const lastStopped = system.lastStopped;
              const lastStarted = system.lastStarted;
              const statusDesc = system.statusDesc;

              return { isActive, lastStopped, lastStarted, statusDesc };
            }
          } else if (toggle === 'stop') {
            //Update the system status

            const system = await System.findByIdAndUpdate(
              systemId,
              { $set: { isActive: false, lastStopped: new Date().toJSON(), statusDesc: 'User: System Stop' } },
              { runValidators: true, new: true }
            );

            const isActive = system.isActive;
            const lastStopped = system.lastStopped;
            const lastStarted = system.lastStarted;
            const statusDesc = system.statusDesc;

            return { isActive, lastStopped, lastStarted, statusDesc };
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
          //TO DO check if system active first
          const systemId = args.systemId

          const systemUpdate = await System.findByIdAndUpdate(
            systemId,
            { $set: { args } },
            { runValidators: true, new: true }
          );

          if (systemUpdate) {
            const status = true;
            const msg = 'System updated'
            return { status, msg }
          } else {
            const status = false;
            const msg = 'System update failed'
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
          //TO DO check if system active first
          const systemId = args.systemId

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
  },
};

module.exports = resolvers;
