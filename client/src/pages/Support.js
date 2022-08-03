import React from 'react';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { Navigate } from 'react-router-dom';


const Support = () => {

  let userId = '';
  if (Auth.loggedIn()) {
    const user = Auth.getProfile();
    userId = user.data._id;
  }

  if (!Auth.loggedIn()) { return <Navigate to="/login" /> };

  return (
    <main>
      <section className="container my-2">
        <div className="page-header">
          Support
        </div>
        <div className="row">

          <div className="sub-header">
            Active System Status
          </div>

          <div className="sub-header">
            Active System Status
          </div>

          <div className="sub-header">
            Active System Status
          </div>

        </div>
      </section>
    </main>
  );
};

export default Support;
