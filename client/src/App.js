import React from 'react';
import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './utils/auth';

import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Account from './pages/Account';
import Systems from './pages/Systems';
import System from './pages/System';
import Events from './pages/Events';
import Market from './pages/Market';
import Results from './pages/Results';
import Result from './pages/Result';
import Api from './pages/Api';
import Support from './pages/Support';
import Header from './components/Header';
import Footer from './components/Footer';
import Nav from './components/Nav';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="container">
          <Header />
          <Nav />
          <div className="container">
            <Routes>
              <Route
                path="/"
                element={<Dashboard />}
              />
              <Route
                path="/login/"
                element={<Login />}
              />
              <Route
                path="/signup/"
                element={<Signup />}
              />
              <Route
                path="/account/"
                element={<Account />}
              />
              <Route
                path="/systems/"
                element={<Systems />}
              />
              <Route
                path="/system/:systemId"
                element={<System />}
              />
              <Route
                path="/events/:systemId"
                element={<Events />}
              />
              <Route
                path="/events/"
                element={<Events />}
              />
              <Route
                path="/market/:marketId"
                element={<Market />}
              />
              <Route
                path="/results/:systemId"
                element={<Results />}
              />
              <Route
                path="/results/"
                element={<Results />}
              />
              <Route
                path="/result/:resultId"
                element={<Result />}
              />
              <Route
                path="/api/"
                element={<Api />}
              />
              <Route
                path="/Support/"
                element={<Support />}
              />
              <Route
                path="*"
                element={<Dashboard />}
              />
            </Routes>
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
