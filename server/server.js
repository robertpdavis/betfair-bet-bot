const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

const BetfairTests = require('./classes/BetfairTests');
const bfTests = new BetfairTests;

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);



// bfTests.login();
// bfTests.getAllEventTypes();
// bfTests.getEventTypeId('Horse Racing');
// bfTests.getEvents('7');
// bfTests.getMarkets('7');
// bfTests.getMarketBook('7');
// bfTests.getRunnerBook('1.201149951', '1240449');

