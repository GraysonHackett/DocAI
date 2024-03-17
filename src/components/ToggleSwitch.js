import React from 'react';
import '../styles/ToggleSwitchStyles.css';
import sunIcon from '../assets/sun.png'; // Adjust the path as per your project structure
import moonIcon from '../assets/moon.png'; // Adjust the path as per your project structure


const ToggleSwitch = ({ isChecked, onChange }) => {
  return (
    <div className="toggle-switch">
      <input type="checkbox" id="toggle" checked={isChecked} onChange={onChange} />
      <label htmlFor="toggle"></label>
      <div className="background"></div>
      {/* Image for Sun */}
      <img src={sunIcon} alt="Sun" className="sun" />

        {/* Image for Moon */}
        <img src={moonIcon} alt="Moon" className="moon" />
    </div>
  );
};

//TODO: Get the sun and moon image in the slider box
//TODO: fix CSS sizing of toggle-switch to fit-content and be same size as login button, relative to screen size

export default ToggleSwitch;
