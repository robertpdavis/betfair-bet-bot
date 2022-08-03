import React, { useState } from 'react';
import Auth from '../../utils/auth';
import { Navigate, renderMatches } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../../App.css';

function SystemLinks({ systemData, linkType, isActive }) {

  if (isActive === true) {
    console.log('here', isActive)
    return (
      <div>
        {systemData.systems.map((item) => {
          if (item.isActive === true) {
            let link = "/" + linkType + "/" + item._id
            return (
              <div key={item.systemId}>
                <Link className="d-inline btn btn-info" to={link}>{item.title}</Link>
              </div>
            )
          } else {
            return (
              <div>
                <hr></hr>
                <h5>No active systems</h5>
                <hr></hr>
              </div>
            )
          }
        })}
      </div>
    );
  } else {
    console.log('there', isActive)
    return (
      <div>
        {systemData.systems.map((item) => {
          if (item.isActive === true) {
            let link = "/" + linkType + "/" + item._id
            return (
              <div key={item.systemId}>
                <Link className="d-inline btn btn-info" to={link}>{item.title}</Link>
              </div>
            )
          } else {
            let link = "/" + linkType + "/" + item._id
            return (
              <div key={item.systemId}>
                <Link className="d-inline btn btn-secondary" to={link}>{item.title}</Link>
              </div>
            )
          }
        })}
      </div>
    );
  }
}

export default SystemLinks;
