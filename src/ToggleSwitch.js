import React from 'react';
import './styles/ToggleSwitchStyles.css';

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

export default ToggleSwitch;
