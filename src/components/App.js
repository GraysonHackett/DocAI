import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chatbot from './Chatbot';
import Taskbar from './Taskbar'; // Import the Taskbar component
import Header from './Header';
import { auth } from '../database/Firebase';
import '../styles/App.css';
import '../styles/Taskbar.css'
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

  const handleFileSelect = (fileUrl) => {
    setUploadedFile(fileUrl);
  };

  return (
    <Router>
      <div className={darkMode ? 'App dark-mode' : 'App'}>
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} user={user} handleSignOut={handleSignOut} />
        <main>
          <Taskbar onSelectFile={handleFileSelect} />
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