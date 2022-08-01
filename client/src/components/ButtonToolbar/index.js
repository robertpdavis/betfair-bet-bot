import React, { useState } from 'react';

const ButtonToolbar = (props) => {

  const [buttonState, setButtonState] = useState(props.buttons);


  const handleButtonClick = (event) => {
    event.preventDefault();
    props.handleButtonClick(event.target.name);
  }

  return (
    <div>
      {buttonState.map((button, i) => {
        return <button key={i} type="button" className={button.class} name={button.name} onClick={handleButtonClick}>{button.title}</button>
      })}
      <hr></hr>
    </div>
  );
};

export default ButtonToolbar;
