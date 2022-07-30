import React, { useEffect, useMemo } from 'react';
import Auth from '../utils/auth';
import SystemTable from '../components/SystemTable';
import { useQuery } from '@apollo/client';
import { Navigate } from 'react-router-dom';
import { QUERY_SYSTEMS } from '../utils/queries';

function Systems() {

  const user = Auth.getProfile();
  const userId = user.data._id;

  const { loading, data } = useQuery(QUERY_SYSTEMS,
    {
      variables: { userId },
    });

  if (!Auth.loggedIn()) { return <Navigate to="/login" /> };

  return (
    <main>
      <section className="container">
        <div className="pt-3 pb-3">
          <h4>Betting Systems</h4>
        </div>
        <div className="row">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <SystemTable systemData={data} />
          )}
        </div>
      </section>
    </main>
  )

}

export default Systems;
