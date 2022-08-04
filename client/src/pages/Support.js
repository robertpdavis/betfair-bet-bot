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
                  Open An Account with Betfair
                </li>
                <li>
                  Get your API keys. See here on how to do that.
                </li>
                <li>
                  Set up a SSL certifcate / key for using when logging into Betfair. Betfair then uses this for the encrytions for all transactions.
                  See here on how to do that.
                </li>
              </ul>
              <a href="https://www.betfair.com.au/hub/how-to-access-the-betfair-api/" target="_blank" rel="noreferrer">ddd</a>get app key and activate

              <a href="https://betfair-datascientists.github.io/api/GoldenRulesofAutomation/" target="_blank" rel="noreferrer">ddd</a> automation hub

              <a href="https://www.betfair.com.au/hub/dev-program/ developer program" target="_blank" rel="noreferrer">ddd</a>

              link to api ref

              button to usage
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

export default Support;
