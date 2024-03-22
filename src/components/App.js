import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import FileOptions from '../components/FileOptions'; 
import Signup from '../authentication/Signup';
import Login from '../authentication/Login';
import Chatbot from './Chatbot';
import Taskbar from './Taskbar';
import '../styles/App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleFileSelect = (fileUrl) => {
    setUploadedFile(fileUrl);
  };

  return (
    <Router>
      <div className={darkMode ? 'App dark-mode' : 'App'}>
        <main className=''>
          <Taskbar onSelectFile={handleFileSelect} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/fileoptions" element={<FileOptions />} />
          </Routes>
          <Chatbot uploadedFile={uploadedFile} />
        </main>        
      </div>
    </Router>
  );
}

export default App;