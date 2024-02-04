// src/Chatbot.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { css } from '@emotion/react';

const Chatbot = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const chatContainerRef = useRef(null);

    useEffect(() => {
        setMessages([{ text: 'Welcome to DocAI! How can I help you?', isUser: false }]);
    }, []);

    const sendMessage = async () => {
        if (input.trim() === '') return;

        setMessages([...messages, { text: input, isUser: true }]);
        setInput('');

        try {
            const response = await axios.post('YOUR_API_ENDPOINT', { input });
            setMessages([...messages, { text: response.data, isUser: false }]);
        } catch (error) {
            console.error('Error sending message:', error);
            setMessages([...messages, { text: 'Oops! Something went wrong.', isUser: false }]);
        }

        // Scroll to the bottom of the chat container after sending a message
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage().then(r => "error"); // TODO: make sure this doesnt break if nothing is returned
        }
    };

    return (    //TODO: get this css in a different file
        <div
            css={css`
                position: fixed;
                bottom: 0;
                width: 100%;
                display: flex;
                flex-direction: column;
            `}
        >
            <div
                css={css`
                    border: 1px solid #ddd;
                    padding: 16px;
                    height: 300px;
                    overflow-y: auto; /* Make it scrollable */
                    border-radius: 8px;
                `}
                ref={chatContainerRef}
            >
                {messages.map((msg, index) => (
                    <div key={index} style={{ textAlign: msg.isUser ? 'right' : 'left', marginBottom: '8px' }}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <div
                css={css`
                    margin-top: 16px;
                    display: flex;
                    align-items: center;
                    padding: 16px;
                    background-color: #fff;
                    border-top: 1px solid #ddd;
                    border-radius: 8px;
                `}
            >
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    css={css`
                        flex: 1;
                        padding: 12px;
                        margin-right: 8px;
                        border: 1px solid #ddd;
                        border-radius: 4px;
                    `}
                />
                <button
                    onClick={sendMessage}
                    css={css`
                        padding: 12px;
                        background-color: #4caf50;
                        color: white;
                        cursor: pointer;
                        border: none;
                        border-radius: 4px;
                    `}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chatbot;
