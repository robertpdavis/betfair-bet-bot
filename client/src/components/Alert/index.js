import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';


const AlertBar = (props) => {

  const alertState = props.alertState;

  return (
    <>
      <Alert show={alertState.show} variant={alertState.variant}>
        {alertState.message}
        <div className="float-end">
          <Button onClick={() => props.handleAlertClick(false)} variant="outline-success">
            Close
          </Button>
        </div>
      </Alert>
    </>
  );

};

export default AlertBar;


