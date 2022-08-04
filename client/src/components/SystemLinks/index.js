import React, { useState } from 'react';
import Auth from '../../utils/auth';
import { Navigate, renderMatches } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../../App.css';

function SystemLinks({ systemData, linkType, isActive }) {

  let sysCount = 0;
  if (isActive === true) {

    return (
      <div>
        {systemData.systems.map((item) => {
          if (item.isActive === true) {
            sysCount++
            let link = "/" + linkType + "/" + item._id
            return (
              <div className="d-inline me-3" key={item.systemId}>
                <Link className="d-inline btn btn-info" to={link}>{item.title}</Link>
              </div>
            )
          }
        })}
      </div>
    );

  } else {

    return (
      <div>
        {systemData.systems.map((item) => {
          if (item.isActive === true) {
            let link = "/" + linkType + "/" + item._id
            return (
              <div className="d-inline me-3" key={item.systemId}>
                <Link className="d-inline btn btn-info" to={link}>{item.title}</Link>
              </div>
            )
          } else {
            let link = "/" + linkType + "/" + item._id
            return (
              <div className="d-inline me-3" key={item.systemId}>
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
