import React from 'react';
import Auth from '../utils/auth';
import SystemLinks from '../components/SystemLinks';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { QUERY_SYSTEMS } from '../utils/queries';
import '../App.css';


const Events = () => {

  let navigate = useNavigate();

  let userId = '';
  if (Auth.loggedIn()) {
    const user = Auth.getProfile();
    userId = user.data._id;
  }

  const { loading: loadingS, data: dataS } = useQuery(QUERY_SYSTEMS,
    {
      variables: { userId },
    });

  if (!Auth.loggedIn()) { navigate("login") };

  if (loadingS) {
    return <div>Loading...</div>;
  }
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
          <div className="pb-3">
            <h6>Select system to view events.</h6>
          </div>
        </div>
      </section>
    </main>
  )

}

export default Events;