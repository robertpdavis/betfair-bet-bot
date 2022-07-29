import React from 'react';

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_SINGLE_SYSTEM } from '../utils/queries';

const SingleSystem = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { systemId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_SYSTEM, {
    // pass URL parameter
    variables: { systemId: systemId },
  });

  const system = data?.system || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="my-3">
      System
    </div>
  );
};

export default SingleSystem;
