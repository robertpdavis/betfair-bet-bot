import React from 'react';

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_SINGLE_RESULT } from '../utils/queries';

const SingleResult = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { resultId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_RESULT, {
    // pass URL parameter
    variables: { resultId: resultId },
  });

  const result = data?.result || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="my-3">
      Result
    </div>
  );
};

export default SingleResult;
