import React from 'react';
import { Link } from 'react-router-dom';
import ToggleSwitch from './ToggleSwitch';
import '../styles/Header.css'; 

function Header({ darkMode, toggleDarkMode, user, handleSignOut }) {
  return (
    <header className="App-header">
      <h1>DocAI</h1>
      <ToggleSwitch isChecked={darkMode} onChange={toggleDarkMode} />
      {user ? (
        <button className="loginButton" onClick={handleSignOut}>
          Sign Out
        </button>
      ) : (
        <Link className="loginButton" to="/login">
          Login
        </Link>
      )}
      {user && <span className="user-name">{user.displayName}</span>}
    </header>
  );
}

export default Header;