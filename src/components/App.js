import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ToggleSwitch from './ToggleSwitch';
import Chatbot from './Chatbot';
import { auth } from '../database/Firebase';
import '../styles/App.css';
import Login from '../authentication/Login';
import Signup from '../authentication/Signup';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

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
            <Link className="loginButton" to="/login">
              Login
            </Link>
          )}
          {user && <span className="user-name">{user.displayName}</span>}
        </header>
        <main>
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
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