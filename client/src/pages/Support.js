import React from 'react';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';

// import ThoughtList from '../components/ThoughtList';
// import ThoughtForm from '../components/ThoughtForm';

// import { QUERY_THOUGHTS } from '../utils/queries';

const Support = () => {
  // const { loading, data } = useQuery(QUERY_THOUGHTS);
  // const thoughts = data?.thoughts || [];

  return (
    <main>
      <section className="container my-2">
        <div className="page-header">
          Support
        </div>
        <div className="row">

        </div>
      </section>
    </main>
  );
};

export default Support;
