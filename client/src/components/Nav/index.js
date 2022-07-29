import React, { useState } from 'react';
import Auth from '../../utils/auth';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../../App.css';

function Nav() {

  const [currentPage, setCurrentPage] = useState('/');

  if (Auth.loggedIn()) {

    const logout = (event) => {
      event.preventDefault();
      Auth.logout();
      return <Navigate to="/login"></Navigate>
    };

    const profile = (event) => {
      event.preventDefault();
      return <Navigate to="/profile"></Navigate>
    };

    return (
      <section>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link to="/" className="nav-link pt-0 pb-0 active" aria-current="page">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link to="/systems" className="nav-link pt-0 pb-0">Systems</Link>
                </li>
                <li className="nav-item">
                  <Link to="/events" className="nav-link pt-0 pb-0">Events</Link>
                </li>
                <li className="nav-item">
                  <Link to="/results" className="nav-link pt-0 pb-0">Results</Link>
                </li>
                <li className="nav-item">
                  <Link to="/api" className="nav-link pt-0 pb-0">API</Link>
                </li>
                <li className="nav-item">
                  <Link to="/support" className="nav-link pt-0 pb-0">Support</Link>
                </li>
              </ul>
            </div>
            <div className="d-inline">
              <button className=" d-inline btn btn-sm btn-info me-2" onClick={profile}>
                Profile
              </button>
              <button className=" d-inline btn btn-sm btn-secondary" onClick={logout}>
                Logout
              </button>
            </div>
          </div>
        </nav>
      </section>
    );
  }
}

export default Nav;
