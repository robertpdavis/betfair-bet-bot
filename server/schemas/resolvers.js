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
    updateAPI: async (parent, args, context) => {
      if (context.user) {

        const api = await Apisetting.findOneAndUpdate(
          { userId: context.user._id },
          { $Set: { args } }
        );

        return api;
      }
      throw new AuthenticationError('Not logged in');
    },
  },
};

module.exports = resolvers;
