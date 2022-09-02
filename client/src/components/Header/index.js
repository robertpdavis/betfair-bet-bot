import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../App.css'
import Auth from '../../utils/auth';

const Header = () => {

  let navigate = useNavigate();

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    navigate("login");
  };

  return (
    <header className="container align-center">
      <div className="row">
        <Link to="/" className="nolink"><h3 className="d-inline">Betfair Bet Bot</h3></Link>
        {Auth.loggedIn() ? (
          <>
            <div className="d-inline">
              <h6 className="d-inline">Welcome {Auth.getProfile().data.firstName}!</h6>
              <div className="d-inline float-end">
                <Link to="/account">
                  <button className=" d-inline btn btn-sm btn-info mb-2 me-3">
                    Account
                  </button>
                </Link>
                <button className=" d-inline btn btn-sm btn-secondary mb-2" onClick={logout}>
                  Logout
                </button>
              </div>
            </div>
          </>
        ) :
          <>
            <h6> Fully featured online web app providing automated betting systems for Betfair users.</h6>
          </>
        }
      </div>
    </header >
  );
};

export default Header;
