// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client'; // Updated import statement
import './styles/App.css'; 
import App from './App';
import reportWebVitals from './reportWebVitals';

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

reportWebVitals();