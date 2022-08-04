import React, { useEffect, useMemo } from 'react';
import Auth from '../utils/auth';
import MarketTable from '../components/MarketTable';
import SystemLinks from '../components/SystemLinks';
import { useQuery } from '@apollo/client';
import { Navigate, useParams } from 'react-router-dom';
import { QUERY_SYSTEMS, QUERY_EVENTS } from '../utils/queries';
import '../App.css';


const Events = () => {

  let { systemId } = useParams();

  let userId = '';
  if (Auth.loggedIn()) {
    const user = Auth.getProfile();
    userId = user.data._id;
  }

  const { loading: loadingS, data: dataS } = useQuery(QUERY_SYSTEMS,
    {
      variables: { userId },
    });

  if (systemId === '') {

    if (!loadingS) {
      systemId = dataS.systems[0]._id;
    }
  }

  console.log(systemId)

  const { loading: loadingE, data: dataE } = useQuery(QUERY_EVENTS,
    {
      variables: { systemId },
    });



  if (!Auth.loggedIn()) { return <Navigate to="/login" /> };

  if (loadingS || loadingE) {
    return <div>Loading...</div>;
  }
  return (
    <main>
      <section className="container my-2">
        <div className="page-header">
          System Events
        </div>
        <div className="row">
          <SystemLinks systemData={dataS} linkType='event' isActive={true} />
          <div className="pb-3 pt-3">
            <h6>Select system to view events.</h6>
          </div>
        </div>
      </section>
    </main>
  )

}

export default Events;