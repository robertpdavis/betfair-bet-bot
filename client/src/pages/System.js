import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_SYSTEM, QUERY_EVENT_TYPES } from '../utils/queries';
import SystemForm from '../components/SystemForm';
import '../App.css';

const SingleSystem = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { systemId } = useParams();

  const { loading: loadingS, data: dataS } = useQuery(QUERY_SINGLE_SYSTEM, {
    // pass URL parameter
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
        <SystemForm system={system} evenTypes={eventTypes} />

      </section>
    </main>
  );
};

export default SingleSystem;
