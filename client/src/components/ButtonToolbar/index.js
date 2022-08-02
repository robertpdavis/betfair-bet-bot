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
        return <button key={i} type="button" className={button.class + ' ' + button.state} name={button.name} onClick={handleButtonClick}>{button.title}</button>
      })}
      <hr></hr>
    </div>
  );
};

export default ButtonToolbar;
