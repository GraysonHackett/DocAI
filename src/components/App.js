import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Import BrowserRouter, Routes, Route, and Link
import ToggleSwitch from './ToggleSwitch';
import Chatbot from './Chatbot';
import { auth } from '../database/Firebase'; // Import Firebase auth
import '../styles/App.css';
import Auth from '../authentication/Auth';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [user] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setUploadedFile(file);
    // You can add further logic here, such as file validation or sending the file to the server.
  };

  return (
    <Router>
      <div className={darkMode ? 'App dark-mode' : 'App'}>
        <div className="leftTaskbar">
          <input type="file" accept=".md" onChange={handleFileUpload} />
        </div>
        <header className="App-header">
          <h1>DocAI</h1>
          <ToggleSwitch isChecked={darkMode} onChange={toggleDarkMode} />
          {user ? (
            <button className="loginButton" onClick={handleSignOut}>
              Sign Out
            </button>
          ) : (
            <Link className="loginLink" to="/Auth">
              Login
            </Link>
          )}
        </header>
        <main>
          <Routes>
            <Route exact path="/Auth" element={<Auth />} />
          </Routes>
          <Chatbot uploadedFile={uploadedFile} />
        </main>
        <footer className="footer">
          DocAI Project Created In Collaboration with Red Hat ©2024
        </footer>
      </div>
    </Router>
  );
}

export default App;
