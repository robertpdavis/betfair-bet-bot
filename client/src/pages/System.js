import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_SYSTEM, QUERY_EVENT_TYPES } from '../utils/queries';
import SystemForm from '../components/SystemForm';
import '../App.css';

const SingleSystem = () => {

  const { systemId } = useParams();

  const { loading: loadingS, data: dataS } = useQuery(QUERY_SINGLE_SYSTEM, {

    variables: { systemId },
  });

  const { loading: loadingE, data: dataE } = useQuery(QUERY_EVENT_TYPES);

  const system = dataS?.system || {};
  const eventTypes = dataE?.eventTypes || {};

  if (loadingS || loadingE) {
    return <div>Loading...</div>;
  }
  return (
    <main>
      <section className="container my-2">
        <div className="page-header">
          {'System: ' + system.systemId + " - " + system.title}
        </div>
        <div className="row">
          <SystemForm system={system} evenTypes={eventTypes} />
        </div>
      </section>
    </main>
  );
};

export default SingleSystem;
