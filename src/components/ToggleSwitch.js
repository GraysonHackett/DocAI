import React from 'react';
import '../styles/ToggleSwitchStyles.css';
import SunIcon from '../assets/sun.png'; // Import the sun icon
import MoonIcon from '../assets/moon.png'; // Import the moon icon

const ToggleSwitch = ({ isChecked, onChange }) => {
  return (
    <div className="toggle-switch">
      <input type="checkbox" id="toggle" checked={isChecked} onChange={onChange} />
      <label htmlFor="toggle" className={isChecked ? 'moon' : 'sun'}>
        <img src={isChecked ? MoonIcon : SunIcon} alt={isChecked ? 'Moon Icon' : 'Sun Icon'} />
      </label>
    </div>
  );
};

export default ToggleSwitch;
