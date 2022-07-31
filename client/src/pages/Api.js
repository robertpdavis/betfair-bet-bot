import React from 'react';
import { Navigate } from 'react-router-dom';
import Auth from "../utils/auth";
// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_SINGLE_API } from '../utils/queries';

const SingleAPI = () => {
  // if (!Auth.loggedIn()) { return <Navigate to="/login" /> };
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { userId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_API, {
    // pass URL parameter
    variables: { userId: userId },
  });

  const api = data?.api || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <main>
      <section className="container my-2">
        <div className="page-header">
          Betfair API
        </div>
        <div className="row">

        </div>
      </section>
    </main>
  );
};

export default SingleAPI;
