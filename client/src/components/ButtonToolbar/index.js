import React, { useState } from 'react';

const ButtonToolbar = (props) => {

  const buttonState = props.buttonState;

  const handleButtonClick = (event) => {
    event.preventDefault();
    props.handleBtnClick(event);
  }

  return (
    <div>
      {buttonState.map((button, i) => {
        return <button key={i} type="button" className={button.class + ' ' + button.state + ' me-3 mb-3 mb-lg-0'} name={button.name} onClick={handleButtonClick}>{button.title}</button>
      })}
      <hr className="mt-0 mt-lg-3"></hr>
    </div>
  );
};

export default ButtonToolbar;
