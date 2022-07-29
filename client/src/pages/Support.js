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
      {Auth.loggedIn()}
      <div className="flex-row justify-center">
        Support
      </div>
    </main>
  );
};

export default Support;
