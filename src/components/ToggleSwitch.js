import React from 'react';
import '../styles/ToggleSwitchStyles.css';

const ToggleSwitch = ({ isChecked, onChange }) => {
  return (
    <div className="toggle-switch">
      <input type="checkbox" id="toggle" checked={isChecked} onChange={onChange} />
      <label htmlFor="toggle"></label>
      <div className="background"></div>
      <svg className="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path></path>
      </svg>
      <svg className="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path></path>
      </svg>
    </div>
  );
};

//TODO: Get the sun and moon image in the slider box
//TODO: fix CSS sizing of toggle-switch to fit-content and be same size as login button, relative to screen size

export default ToggleSwitch;
