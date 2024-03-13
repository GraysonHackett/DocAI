import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ChatbotStyles.css';
import ReactMarkdown from 'react-markdown';
import { storage } from '../database/Firebase';
import { getDownloadURL, ref } from '@firebase/storage';

function Chatbot({ uploadedFile }) {
  const [messages, setMessages] = useState([]);
  const [textInput, setTextInput] = useState('');
  const [documentation, setDocumentation] = useState(''); 

  useEffect(() => {
    const fetchFileContents = async () => {
      try {
        if (uploadedFile) {
          const fileRef = ref(storage, uploadedFile);
          const fileUrl = await getDownloadURL(fileRef);
          const response = await axios.get(fileUrl);
          setDocumentation(response.data); // Assuming the file contains documentation text
        }
      } catch (error) {
        console.error('Error fetching file contents:', error);
      }
    };

    fetchFileContents();
  }, [uploadedFile]);

  // TODO: add personality to chatbot and test it "hi im docai".....
  const instructions =
    'Please use the markdown files I am about to send to you, to answer questions about the provided project documentation. Only get answers from the documentation and when not possible, give the best answer utilizing outside sources. Make sure to make the answers as concise as possible, and even copy and paste answers from the documentation when necessary';

  const fetchAIResponse = async () => {
    try {

      const apiKey = process.env.REACT_APP_API_KEY;
      const prompt = `${instructions} \n\n ${documentation} \n\n ${textInput}`;
      console.log(prompt); 
      const url = 'https://api.openai.com/v1/chat/completions';
      setTextInput('');
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

      if (response.data.choices && response.data.choices.length > 0) {
        const chosenText = response.data.choices[0].message.content;
        setMessages(oldMessages => [
          ...oldMessages,
          { text: textInput, sender: 'user' },
          { text: chosenText, sender: 'ai' }
        ]);
      } else {
        console.error('Error: No choices found in the response');
      }
    } catch (error) {
      console.error('Error fetching OpenAI API:', error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      fetchAIResponse();
    }
  };

  const readFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
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

export default Chatbot;
