import React, { useEffect, useMemo } from 'react';
import Auth from '../utils/auth';
import SystemTable from '../components/SystemTable';
import ButtonToolbar from '../components/ButtonToolbar';
import { useQuery } from '@apollo/client';
import { Navigate } from 'react-router-dom';
import { QUERY_SYSTEMS } from '../utils/queries';
import '../App.css';

const Systems = () => {

  let userId = '';
  if (Auth.loggedIn()) {
    const user = Auth.getProfile();
    userId = user.data._id;
  }

  const { loading, data } = useQuery(QUERY_SYSTEMS,
    {
      variables: { userId },
    });

  if (!Auth.loggedIn()) { return <Navigate to="/login" /> };

  const buttons =
    [
      {
        name: 'new',
        title: 'New System',
        class: 'btn btn-sm btn-success me-3'
      }
    ]

  const handleButtonClick = (name) => {

    console.log(name)
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <main>
      <section className="container my-2">
        <div className="page-header">
          Betting Systems
        </div>
        <div className="row">
          <ButtonToolbar buttons={buttons} handleClick={handleButtonClick} />
        </div>
        <div className="row">
          <SystemTable systemData={data} />
        </div>
      </section>
    </main>
  );
};

export default Systems;
