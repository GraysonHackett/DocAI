import React, { useState } from 'react';
import ToggleSwitch from './ToggleSwitch';
import Chatbot from './Chatbot';
import './styles/App.css';

function App() {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className={darkMode ? "App dark-mode" : "App"}>
            <div className="leftTaskbar"></div>
            <header className="App-header">
                <h1>DocAI</h1>
                <ToggleSwitch isChecked={darkMode} onChange={toggleDarkMode} />
            </header>
            <main>
                <Chatbot/>
            </main>
            <footer className='footer'>
                DocAI Project Created In Collaboration with Red Hat ©2024 
            </footer>
        </div>
    );
}

export default App;