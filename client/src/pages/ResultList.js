import React, { useEffect, useMemo } from 'react';
import Auth from '../utils/auth';
import ResultTable from '../components/ResultTable';
import SystemLinks from '../components/SystemLinks';
import { useQuery } from '@apollo/client';
import { Navigate, useParams } from 'react-router-dom';
import { QUERY_SYSTEMS, QUERY_RESULTS } from '../utils/queries';


function ResultList() {

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


  if (!Auth.loggedIn()) { return <Navigate to="/login" /> };

  if (loadingS || loadingR) {
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
            <h6>Bets placed and results for: <b>System {dataS.systems[0].systemId}-{dataS.systems[0].title}</b></h6>
          </div>
          <ResultTable resultData={dataR} />
        </div>
      </section>
    </main>
  );
};

export default ResultList;
