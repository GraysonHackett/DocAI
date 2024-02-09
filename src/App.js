// src/App.js
import React from 'react';
import Chatbot from './Chatbot';
import './App.css'; // Add this line

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Welcome to DocAI</h1>
            </header>
            <main>
                <Chatbot/>
            </main>
        </div>
    );
}

export default App;
