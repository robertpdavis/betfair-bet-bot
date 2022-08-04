import React from 'react';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { Navigate } from 'react-router-dom';


const Usage = () => {

  let userId = '';
  if (Auth.loggedIn()) {
    const user = Auth.getProfile();
    userId = user.data._id;
  }

  if (!Auth.loggedIn()) { return <Navigate to="/login" /> };

  return (
    <main>
      <section className="container">
        <div className="page-header">
          Support
        </div>
        <div className="row">

          <div className="sub-header w-75">
            Dashboard
          </div>
          <div className="card w-75 mb-3">
            <div className="card-body">
              <p>
                The Dashboard provides a summary of your current betting status along with details of all active betting systems and the last 4 bets placed.
              </p>
            </div>
          </div>

          <div className="sub-header w-75">
            Systems
          </div>
          <div className="card w-75 mb-3">
            <div className="card-body">
              <p>
                Systems is where all the action happens. This page lists all your systems and status of each one. Clicking on the name of the system.
              </p>

            </div>
          </div>

          <div className="sub-header w-75">
            Events
          </div>
          <div className="card w-75 mb-3">
            <div className="card-body">
              <p>
                It is highly recommended you read the Betfair API reference guide to get a good
                understanding of how it works so you can set up your betting systems exactly how you want.
              </p>

            </div>
          </div>
          <div className="sub-header w-75">
            Results
          </div>
          <div className="card w-75 mb-3">
            <div className="card-body">
              <p>
                It is highly recommended you read the Betfair API reference guide to get a good
                understanding of how it works so you can set up your betting systems exactly how you want.
              </p>

            </div>
          </div>
          <div className="sub-header w-75">
            API
          </div>
          <div className="card w-75 mb-3">
            <div className="card-body">
              <p>
                It is highly recommended you read the Betfair API reference guide to get a good
                understanding of how it works so you can set up your betting systems exactly how you want.
              </p>

            </div>
          </div>
        </div>
      </section>
    </main >
  );
};

export default Usage;
