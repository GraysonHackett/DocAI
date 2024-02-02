import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { css } from '@emotion/react';

const Chatbot = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Add a welcome message when the component mounts
        setMessages([{ text: 'Welcome to DocAI! How can I help you?', isUser: false }]);
    }, []);

    const sendMessage = async () => {
        if (input.trim() === '') return;

        // Add user message to the state
        setMessages([...messages, { text: input, isUser: true }]);
        setInput('');

        try {
            // Send user message to your API and get the response
            const response = await axios.post('YOUR_API_ENDPOINT', { input });

            // Add the bot's response to the state
            setMessages([...messages, { text: response.data, isUser: false }]);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div>
            <div
                css={css`
          border: 1px solid #ddd;
          padding: 16px;
          height: 300px;
          overflow-y: scroll;
        `}
            >
                {messages.map((msg, index) => (
                    <div key={index} style={{ textAlign: msg.isUser ? 'right' : 'left' }}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <div
                css={css`
          margin-top: 16px;
        `}
            >
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chatbot;
