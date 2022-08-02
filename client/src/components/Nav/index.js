import React, { useState } from 'react';
import Auth from '../../utils/auth';
import { Navigate, renderMatches } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../../App.css';

function Navigation() {

  const [currentPage, setCurrentPage] = useState('/');

  if (Auth.loggedIn()) {

    const handleNavClick = (event) => {

      setCurrentPage(event.target.name);
    }

    return (
      <section>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link to="/" className={currentPage === '/' ? 'nav-link pt-0 pb-0 active' : 'nav-link pt-0 pb-0'} name="/" onClick={handleNavClick}>Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link to="/systems" className={currentPage === '/systems' ? 'nav-link pt-0 pb-0 active' : 'nav-link pt-0 pb-0'} name="/systems" onClick={handleNavClick}>Systems</Link>
                </li>
                <li className="nav-item">
                  <Link to="/events" className={currentPage === '/events' ? 'nav-link pt-0 pb-0 active' : 'nav-link pt-0 pb-0'} name="/events" onClick={handleNavClick}>Events</Link>
                </li>
                <li className="nav-item">
                  <Link to="/results" className={currentPage === '/results' ? 'nav-link pt-0 pb-0 active' : 'nav-link pt-0 pb-0'} name="/results" onClick={handleNavClick}>Results</Link>
                </li>
                <li className="nav-item">
                  <Link to="/api" className={currentPage === '/api' ? 'nav-link pt-0 pb-0 active' : 'nav-link pt-0 pb-0'} name="/api" onClick={handleNavClick}>API</Link>
                </li>
                <li className="nav-item">
                  <Link to="/support" className={currentPage === '/support' ? 'nav-link pt-0 pb-0 active' : 'nav-link pt-0 pb-0'} name="/support" onClick={handleNavClick}>Support</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </section >
    );
  }
}

export default Navigation;
