import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';

function SystemLinks({ systemData, linkType, isActive }) {

  let sysCount = 0;
  if (isActive === true) {

    return (
      <div className="col-12">
        {systemData.systems.map((item) => {
          if (item.isActive === true) {
            sysCount++
            let link = "/" + linkType + "/" + item._id
            return (
              <div className="d-inline me-3" key={item.systemId}>
                <Link className="btn btn-info mb-3" to={link}>{item.systemId + '.' + item.title}</Link>
              </div>
            )
          }
        })}
      </div>
    );

  } else {

    return (
      <div className="col-12">
        {systemData.systems.map((item) => {
          if (item.isActive === true) {
            let link = "/" + linkType + "/" + item._id
            return (
              <div className="d-inline me-3" key={item.systemId}>
                <Link className="btn btn-info mb-3" to={link}>{item.systemId + '.' + item.title}</Link>
              </div>
            )
          } else {
            let link = "/" + linkType + "/" + item._id
            return (
              <div className="d-inline me-3" key={item.systemId}>
                <Link className="btn btn-secondary mb-3" to={link}>{item.systemId + '.' + item.title}</Link>
              </div>
            )
          }
        })}
      </div>
    );
  }
}

export default SystemLinks;
