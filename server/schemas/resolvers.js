const { Apisetting, Config, Event, EventType, Market, Result, Runner, Scenario, Staking, System, User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
    systems: async (parent, { userId }) => {
      return System.find({ userId });
    },
    system: async (parent, args) => {
      return System.findById(args.id);
    },
    events: async (parent, { systemId }) => {
      const params = systemId ? { systemId } : {};
      return Event.find(params).populate('markets');
    },
    market: async (parent, args) => {
      return Market.findById(args.id).populate('runners');
    },
    runner: async (parent, args) => {
      return Runner.findById(args.id);
    },
    results: async (parent, { systemId }) => {
      const params = systemId ? { systemId } : {};
      return Result.find(params).sort({ createdAt: -1 });
    },
    result: async (parent, args) => {
      return Result.findById(args.id);
    },
    api: async (parent, { userId }) => {
      return Apisetting.findOne({ userId });
    },
  },

  Mutation: {
    createUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
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
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
