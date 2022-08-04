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
      <section className="container my-2">
        <div className="page-header">
          Support
        </div>
        <div className="row">

          <div className="sub-header w-75">
            New Users
          </div>
          <div className="card w-75 mb-3">
            <div className="card-body">
              <p>
                Congratulations in starting your system bettings with us.!
                Before you can use the app, there are a few things you need to go first.
              </p>
              <ul>
                <li>
                  Open An Account with Betfair - you can do that <a href>here</a>
                </li>
              </ul>
              https://www.betfair.com.au/hub/how-to-access-the-betfair-api/ get app key and activate

              https://betfair-datascientists.github.io/api/GoldenRulesofAutomation/ automation hub

              https://www.betfair.com.au/hub/dev-program/ developer program

              link to api ref
            </div>
          </div>

          <div className="sub-header w-75">
            Betfair API Links
          </div>
          <div className="card w-75 mb-3">
            <div className="card-body">
              <p>
                It is highly recommended you read the Betfair API reference guide to get a good
                understanding of how it works so you can set up your betting systems exactly how you want.
              </p>
              <p>
                Use the test API to try things out before going live and putting your money on the line.
                The app does all the heavy lifting for you. You just need to configure it!
              </p>
              <p>
                You can find the Betfair API reference guide here
              </p>
            </div>
          </div>

          <div className="sub-header w-75">
            Betting on Betfair
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
