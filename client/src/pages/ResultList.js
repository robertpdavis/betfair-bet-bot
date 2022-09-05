import React from 'react';
import Auth from '../utils/auth';
import ResultTable from '../components/ResultTable';
import SystemLinks from '../components/SystemLinks';
import { useQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';
import { QUERY_SYSTEMS, QUERY_RESULTS } from '../utils/queries';


function ResultList() {

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

  const { loading: loadingR, data: dataR } = useQuery(QUERY_RESULTS,
    {
      variables: { systemId },
      pollInterval: 5000,
    });


  if (!Auth.loggedIn()) { navigate("login") };

  if (loadingS || loadingR) {
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
          System Results
        </div>
        <div className="row">
          <SystemLinks systemData={dataS} linkType='resultList' isActive={false} />
          <div className="pb-3 pt-3">
            <h6>Bets placed and results for: <b>System {selectedSystem.systemId}-{selectedSystem.title}</b></h6>
          </div>
          <ResultTable resultData={dataR} />
        </div>
      </section>
    </main>
  );
};

export default ResultList;
