// src/App.js
import React from 'react';
import Chatbot from './Chatbot';
import './App.css'; // Ensure this line is here to import your CSS
import logo from './assets/logo.png';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} alt="DocAI Logo" className="App-logo"/> {/* Add this line for the logo */}
                <h1>DocAI</h1>
            </header>
            <main>
                <Chatbot/>
            </main>
        </div>
    );
}

export default App;