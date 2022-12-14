//const express = require('express');
import express from 'express';
//const { ApolloServer } = require('apollo-server-express');
import { ApolloServer } from 'apollo-server-express';
//const path = require('path');
import path from 'path';
import { typeDefs, resolvers } from './schemas/index.js';
//import { resolvers } from './schemas/resolvers.js';
//import { typeDefs } from './schemas/typedefs.js';
//const db = require('./config/connection');
import db from './config/connection.js';
//const { scheduler, tests } = require('./utils/scheduler');
import { scheduler, tests } from './utils/scheduler.js';
//const { authMiddleware } = require('./utils/auth');
import { authMiddleware } from './utils/auth.js';
import 'dotenv/config';
import * as url from 'url';

//const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const PORT = process.env.PORT || 3005;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve up static assets
app.use('/images', express.static(path.join(__dirname, '../client/images')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
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
startApolloServer();

//Start the scheduler
scheduler();
// tests();