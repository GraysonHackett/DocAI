import React, { useState } from 'react';
import axios from 'axios';
import './ChatbotStyles.css';
import ReactMarkdown from 'react-markdown'; 

const readDocumentation = async () => {
  try {
    const response = await fetch('/documentation_set/test.md');
    const fileContents = await response.text();
    return fileContents.trim(); // Trim whitespace from both ends
  } catch (error) {
    console.error('Error reading documentation:', error);
    return '';
  }
};

function OpenAIExample() {
  const [messages, setMessages] = useState([]);
  const [textInput, setTextInput] = useState('');
  const [documentation, setDocumentation] = useState('');

  const instructions =
    'Please use the markdown files I am about to send to you, to answer questions about the provided project documentation. Only get answers from the documentation and when not possible, give the best answer utilizing outside sources. Make sure to make the answers as consice as possible, and even copy and paste answers from the documentation when necessary';

  
  const fetchAIResponse = async () => {
    try {
      if (!documentation) {
        const docs = await readDocumentation();
        setDocumentation(docs); //TODO: Application appears to be sending first request without documentation, then every following request with? 
      }

      const apiKey = process.env.REACT_APP_API_KEY;
      const prompt = `${instructions} \n\n ${documentation} \n\n ${textInput}`;
      const url = 'https://api.openai.com/v1/chat/completions';
      setTextInput(''); // clears the text box, possibly put after response from API?
      console.log(prompt); 
      const response = await axios.post(
        url,
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 500,
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
          { text: textInput, sender: 'user' },
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
          {msg.sender === 'ai' ? (
            <ReactMarkdown>{msg.text}</ReactMarkdown>
          ) : (
            <div>{msg.text}</div>
          )}
        </div>
      ))}
    </div>
      <div className='input-container'>
        <input
            className="text-box"
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="What can I help you with today?"
        ></input>
        <button onClick={fetchAIResponse} className="send-button">
            Send
          </button>
      </div>
    </div>
  );
}

export default OpenAIExample;