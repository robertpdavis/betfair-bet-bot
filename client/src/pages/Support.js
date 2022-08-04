import React from 'react';
import Auth from '../utils/auth';
import { Navigate, Link } from 'react-router-dom';


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
                Congratulations in starting your system betting with us.!
                Before you can use the app, there are a few things you need to go first.
              </p>
              <ul>
                <li>
                  Open an account with Betfair
                </li>
                <li>
                  Get your API keys. See <a href="https://www.betfair.com.au/hub/how-to-access-the-betfair-api/" target="_blank" rel="noreferrer">here</a> on how to do that.
                </li>
                <li>
                  Set up a SSL certifcate / key for using when logging into Betfair. Betfair then uses this for the encrytions for all transactions.
                  See <a href="https://docs.developer.betfair.com/display/1smk3cen4v3lu3yomq5qye0ni/Certificate+Generation+With+XCA" target="_blank" rel="noreferrer">here.</a>
                </li>
              </ul>
              <p>
                It is highly recommended you read the Betfair API reference guide to get a good
                understanding of how it works so you can set up your betting systems exactly how you want.

                Get a copy of the guide <a href="https://docs.developer.betfair.com/pages/viewpage.action?pageId=4392320">here.</a>
              </p>
              <p>
                {/* <button className="btn btn sm btn-warning"><Link to='/Usage'>App User Guide</Link></button> */}
              </p>
            </div>
          </div>

          <div className="sub-header w-75">
            Betfair API Links
          </div>
          <div className="card w-75 mb-3">
            <div className="card-body">
              <p>
                To understand the API in more detail, Betfair has set up a developer hub with extensive documentation on it.
              </p>
              <p>
                Click <a href="https://betfair-datascientists.github.io/api/GoldenRulesofAutomation/" target="_blank" rel="noreferrer">here</a> for Betfair's automation hub.
              </p>
              <p>
                Betfair also have a developer program that has a lot of useful information as well.
              </p>
              <p>
                Click <a href="https://www.betfair.com.au/hub/dev-program/" target="_blank" rel="noreferrer">here</a> for Betfair's developer program.
              </p>
            </div>
          </div>

          <div className="sub-header w-75">
            Betting on Betfair
          </div>
          <div className="card w-75 mb-3">
            <div className="card-body">
              <p>
                It is all good and well knowing how the API works and how you can use it to bet, but what about how to bet?

                Befair has some great learning information <a href="https://www.betfair.com.au/hub/learning-home/">here</a>
              </p>

            </div>
          </div>
        </div>
      </section>
    </main >
  );
};

export default Support;
