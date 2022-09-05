import React, { useEffect, useMemo } from 'react';
import Auth from '../utils/auth';
import MarketTable from '../components/MarketTable';
import SystemLinks from '../components/SystemLinks';
import { useQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';
import { QUERY_SYSTEMS, QUERY_EVENTS } from '../utils/queries';
import '../App.css';


const EventList = () => {

  let navigate = useNavigate();

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

  const { loading: loadingE, data: dataE } = useQuery(QUERY_EVENTS,
    {
      variables: { systemId },
    });

  if (!Auth.loggedIn()) { navigate("login") };

  if (loadingS || loadingE) {
    return <div>Loading...</div>;
  }

  //Get details of selected system
  const selectedSystem = (dataS.systems.filter((system) => {
    if ((system._id) === systemId) {
      return system
    }
  }))[0]

  return (
    <main>
      <section className="container my-2">
        <div className="page-header">
          System Events
        </div>
        <div className="row">
          <SystemLinks systemData={dataS} linkType='eventList' isActive={true} />
        </div>
        <div className="row">
          <div className="pb-3 pt-3">
            <h6>Upcoming events for: <b>System {selectedSystem.systemId}-{selectedSystem.title}</b></h6>
          </div>
          <MarketTable eventData={dataE} />
        </div>
      </section>
    </main>
  )

}

export default EventList;