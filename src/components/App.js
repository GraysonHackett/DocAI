import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ref, uploadString } from "firebase/storage";
import { storage, auth } from "../database/Firebase";
import React, { useState } from 'react';
import FileOptions from '../components/FileOptions'; 
import Signup from '../authentication/Signup';
import Login from '../authentication/Login';
import Chatbot from './Chatbot';
import Taskbar from './Taskbar';
import line from '../assets/linec.png'
import '../styles/App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [collapse, setCollapse] = useState(false); 
  const [uploadedFile, setUploadedFile] = useState(null);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleFileSelect = (fileUrl) => {
    deleteHistory(); 
    setUploadedFile(fileUrl);
  };

  const deleteHistory = () => {
    uploadString((ref(storage, `chatHistory/${auth.currentUser.uid}/chatHistory.txt`)), '');
  }

  const toggleCollapse = () => {
    setCollapse(!collapse); 
  }


  return (
    <Router>
      <div className={darkMode ? 'App dark-mode' : 'App'}>
          <Taskbar
            onSelectFile={handleFileSelect}
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            isCollapsed={collapse}
          />
          <button className={collapse ? 'collapseButton collapsed' : 'collapseButton'} onClick={toggleCollapse}>
            <img src={line} alt="Collapse Button" className="base-image-1" />
            <img src={line} alt="Collapse Button" className="base-image-2" />
          </button>
          <Routes>
            <Route exact path="/" element={<main/>} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/fileoptions" element={<FileOptions />} />
          </Routes>
          <Chatbot uploadedFile={uploadedFile} isCollapsed={collapse} />
      </div>
    </Router>
  );
}

export default App;