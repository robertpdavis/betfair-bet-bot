import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_SYSTEM, QUERY_EVENT_TYPES } from '../utils/queries';
import SystemForm from '../components/SystemForm';

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
    <div className="my-3">
      {system.title}
      <SystemForm system={system} evenTypes={eventTypes} />

    </div>
  );
};

export default SingleSystem;
