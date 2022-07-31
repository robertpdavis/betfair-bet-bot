import React, { useEffect, useMemo } from 'react';
import Auth from '../utils/auth';
import SystemTable from '../components/SystemTable';
import { useQuery } from '@apollo/client';
import { Navigate } from 'react-router-dom';
import { QUERY_SYSTEMS } from '../utils/queries';
import '../App.css';

const Systems = () => {

  const user = Auth.getProfile();
  const userId = user.data._id;

  const { loading, data } = useQuery(QUERY_SYSTEMS,
    {
      variables: { userId },
    });

  if (!Auth.loggedIn()) { return <Navigate to="/login" /> };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <main>
      <section className="container my-2">
        <div className="page-header">
          Betting Systems
        </div>
        <div className="row">
          <SystemTable systemData={data} />
        </div>
      </section>
    </main>
  );
};

export default Systems;
