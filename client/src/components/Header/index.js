import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css'
import Auth from '../../utils/auth';

const Header = () => {

  return (
    <header className="container align-center">
      <h3>Betfair Bet Bot</h3>
      {Auth.loggedIn() ? (
        <>
          <h6 className="d-inline">Welcome {Auth.getProfile().data.firstName}!</h6>
          <div className="d-inline float-end">
            Betfair Funds
          </div>
        </>
      ) : <></>}
    </header>
  );
};

export default Header;
