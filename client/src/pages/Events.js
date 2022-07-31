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

  const user = Auth.getProfile();
  const userId = user.data._id;

  const { loading: loadingS, data: dataS } = useQuery(QUERY_SYSTEMS,
    {
      variables: { userId },
    });

  if (systemId = '') {
    if (dataS) {
      systemId = dataS.systems._id
    }
  }

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
          <SystemLinks systemData={dataS} linkType='events' />
          <div className="pb-3 pt-3">
            <h6>Upcoming events for system {dataS.systems[0].systemId}-{dataS.systems[0].title}</h6>
          </div>
          <MarketTable eventData={dataE} />
        </div>
      </section>
    </main>
  )

}

export default Events;
