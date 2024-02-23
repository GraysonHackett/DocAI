// src/App.js
import React from 'react';
import Chatbot from './Chatbot';
import './App.css'; // Ensure this line is here to import your CSS
import logo from './assets/logo.png';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                
                <h1>DocAI</h1>
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