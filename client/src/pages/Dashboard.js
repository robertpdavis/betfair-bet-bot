import React from 'react';
import { Navigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';

// import ThoughtList from '../components/ThoughtList';
// import ThoughtForm from '../components/ThoughtForm';

// import { QUERY_THOUGHTS } from '../utils/queries';

const Dashboard = () => {

  if (!Auth.loggedIn()) { return <Navigate to="/login" /> };

  // const { loading, data } = useQuery(QUERY_THOUGHTS);
  // const thoughts = data?.thoughts || [];

  return (
    <main>
      {Auth.loggedIn()}
      <div className="flex-row justify-center">
        Dashboard
      </div>
    </main>
  );
};

export default Dashboard;
