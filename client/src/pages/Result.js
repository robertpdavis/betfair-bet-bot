import React from 'react';
import ResultForm from '../components/ResultForm';
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

  console.log(result)

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <main>
      <section className="container my-2">
        <div className="page-header">
          Bet Details & Result
        </div>
        <div className="row">
          <ResultForm result={result} />

        </div>
      </section>
    </main>
  );
};

export default SingleResult;
