import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function OpenAIExample() {
  const [messages, setMessages] = useState([]);
  const [textInput, setTextInput] = useState('');

  const fetchAIResponse = async () => {
    try {
      const userMessage = textInput;
      const apiKey = process.env.REACT_APP_API_KEY;
      const prompt = textInput;
      const url = 'https://api.openai.com/v1/chat/completions';
      setTextInput(''); // clears the text box, possibly put after response from API?

      const response = await axios.post(
        url,
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 50,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      // Ensure choices array exists and has at least one element
      if (response.data.choices && response.data.choices.length > 0) {
        const chosenText = response.data.choices[0].message.content;
        setMessages(oldMessages => [
          ...oldMessages,
          { text: userMessage, sender: 'user' },
          { text: chosenText, sender: 'ai' }
        ]);
      } else {
        console.error('Error: No choices found in the response');
        //setResponse('');
      }

      // Clear the text input after sending the message
    } catch (error) {
      console.error('Error fetching OpenAI API:', error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      fetchAIResponse();
    }
  };

  return (
    <div className="openai-container">
      <div className="messages-container">
        {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
      </div>
      <div className="input-container">
        <input
          className="text-box"
          type="text"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="What can I help you with today?"
        />
        <button onClick={fetchAIResponse} className="send-button">
          Send Message
        </button>
      </div>
    </div>
  );
}

export default OpenAIExample;
