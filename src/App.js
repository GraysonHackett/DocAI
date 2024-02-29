import React, { useState } from 'react';
import ToggleSwitch from './ToggleSwitch';
import Chatbot from './Chatbot';
import './styles/App.css';

function App() {
    const [darkMode, setDarkMode] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setUploadedFile(file);
        // You can add further logic here, such as file validation or sending the file to the server.
    };

    return (
        <div className={darkMode ? "App dark-mode" : "App"}>
            <div className="leftTaskbar">
                <input type="file" accept='.md' onChange={handleFileUpload} />
            </div>
            <header className="App-header">
                <h1>DocAI</h1>
                <ToggleSwitch isChecked={darkMode} onChange={toggleDarkMode} />
            </header>
            <main>
                <Chatbot uploadedFile={uploadedFile} />
            </main>
            <footer className='footer'>
                DocAI Project Created In Collaboration with Red Hat ©2024 
            </footer>
        </div>
    );
}

export default App;
