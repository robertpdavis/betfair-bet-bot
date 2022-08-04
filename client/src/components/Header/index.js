import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import '../../App.css'
import Auth from '../../utils/auth';

const Header = () => {

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    return <Navigate to="/login" />
  };

  return (
    <header className="container align-center">
      <div className="row">
        <h3 className="d-inline">Betfair Bet Bot</h3>
        {Auth.loggedIn() ? (
          <>
            <div className="d-inline">
              <h6 className="d-inline">Welcome {Auth.getProfile().data.firstName}!</h6>
              <h6 className="d-inline"> Betfair Funds</h6>
              <div className="d-inline float-end">
                <button className=" d-inline btn btn-sm btn-info mb-2 me-3" onClick={logout}><Link to="/profile">
                  Profile
                </Link>
                </button>

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
