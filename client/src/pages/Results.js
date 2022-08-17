import React from 'react';
import Auth from '../utils/auth';
import SystemLinks from '../components/SystemLinks';
import { useQuery } from '@apollo/client';
import { Navigate } from 'react-router-dom';
import { QUERY_SYSTEMS } from '../utils/queries';
import '../App.css';


const Results = () => {

  let userId = '';
  if (Auth.loggedIn()) {
    const user = Auth.getProfile();
    userId = user.data._id;
  }

  const { loading: loadingS, data: dataS } = useQuery(QUERY_SYSTEMS,
    {
      variables: { userId },
    });

  if (!Auth.loggedIn()) { return <Navigate to="/login" /> };

  if (loadingS) {
    return <div>Loading...</div>;
  }
  return (
    <main>
      <section className="container my-2">
        <div className="page-header">
          System Results
        </div>
        <div className="row">
          <SystemLinks systemData={dataS} linkType='resultList' isActive={false} />
          <div className="pb-3 pt-3">
            <h6>Select system to view results.</h6>
          </div>
        </div>
      </section>
    </main>
  )

}

export default Results;