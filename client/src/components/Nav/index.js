import React, { useState } from 'react';
import Auth from '../../utils/auth';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../../App.css';

function Navigation() {

  //Get the page path
  let location = useLocation();
  let currentPage = location.pathname

  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);



  if (Auth.loggedIn()) {

    return (
      <section>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarcontent" aria-controls="navbarcontent" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation" onClick={handleNavCollapse}>
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarcontent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link to="/" className={currentPage === '/' ? 'nav-link pt-0 pb-0 active' : 'nav-link pt-0 pb-0'} name="/">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link to="/systems" className={currentPage.substring(0, 7) === '/system' ? 'nav-link pt-0 pb-0 active' : 'nav-link pt-0 pb-0'} name="/systems">Systems</Link>
                </li>
                <li className="nav-item">
                  <Link to="/events" className={(currentPage === '/events' || currentPage.substring(0, 10) === '/eventList' || currentPage.substring(0, 7) === '/market') ? 'nav-link pt-0 pb-0 active' : 'nav-link pt-0 pb-0'} name="/events">Events</Link>
                </li>
                <li className="nav-item">
                  <Link to="/results" className={(currentPage === '/results' || currentPage.substring(0, 10) === '/resultList' || currentPage.substring(0, 7) === '/result') ? 'nav-link pt-0 pb-0 active' : 'nav-link pt-0 pb-0'} name="/results">Results</Link>
                </li>
                <li className="nav-item">
                  <Link to="/api" className={currentPage === '/api' ? 'nav-link pt-0 pb-0 active' : 'nav-link pt-0 pb-0'} name="/api">API</Link>
                </li>
                <li className="nav-item">
                  <Link to="/support" className={(currentPage === '/support' || currentPage === '/usage') ? 'nav-link pt-0 pb-0 active' : 'nav-link pt-0 pb-0'} name="/support">Support</Link>
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
