import React from 'react';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { useNavigate } from 'react-router-dom';


const Usage = () => {

  let navigate = useNavigate();

  let userId = '';
  if (Auth.loggedIn()) {
    const user = Auth.getProfile();
    userId = user.data._id;
  }

  if (!Auth.loggedIn()) { navigate("login") };

  return (
    <main>
      <section className="container my-2">
        <div className="page-header">
          Support
        </div>
        <div className="sub-header">
          Dashboard
        </div>
        <div className="card mb-3">
          <div className="card-body">
            <p>
              The Dashboard provides a summary of your current betting status along with details of all active betting systems and the last 4 bets placed.
            </p>
          </div>
        </div>

        <div className="sub-header">
          Systems
        </div>
        <div className="card mb-3">
          <div className="card-body">
            <p>
              Systems is where all the action happens. This page lists all your systems and status of each one. A new system can be created or existing system be copied or archived. (Archived
              systems don't appear in the list unless the show archived systems is ticked). Click on the id of the system for details.
              Systems can be started, stopped and archived. The system stats can also be reset.
            </p>
            <p>
              There are 4 tabs for<br></br>
              * System Details - includes the systems main details including the event type, scenario and staking plans.<br></br>
              * System Stats - Overview of the system stats<br></br>
              * System Limits - Limits can be set on a variety on stats so that your system is autimatically stopped when reched.<br></br>
              * Bet Settings - These settings determine when a bet is made and the stake of the bet throught scenarios and staking plans.<br></br>
              * System Filter Settings - A comprehensive set of fields to zero down on the events and markets you want to consider bets on.<br></br>
            </p>
          </div>
        </div>

        <div className="sub-header">
          Events
        </div>
        <div className="card mb-3">
          <div className="card-body">
            <p>
              The Events page provides all relevant event and market details for the system that the betting will be based upon. Clicking on the time will provide details
              about the market.
            </p>

          </div>
        </div>
        <div className="sub-header">
          Results
        </div>
        <div className="card mb-3">
          <div className="card-body">
            <p>
              The Results page provides details on all bets made for a system and their status. Clicking on the bet provides full details of the bet and status.
            </p>

          </div>
        </div>
        <div className="sub-header ">
          API
        </div>
        <div className="card mb-3">
          <div className="card-body">
            <p>
              The API page is where all the connection information required for the Betfair API and current status. Your Befair username and password is
              required along with SSL certificate informaton and API keys. All this is needed to be able to log into Betfair so you can activate your betting systems.
            </p>
          </div>
        </div>
      </section>
    </main >
  );
};

export default Usage;
