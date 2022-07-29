import React from 'react';

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_SINGLE_MARKET } from '../utils/queries';

const SingleSystem = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { marketId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_MARKET, {
    // pass URL parameter
    variables: { marketId: marketId },
  });

  const market = data?.market || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="my-3">
      Market
    </div>
  );
};

export default SingleSystem;
