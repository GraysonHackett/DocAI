import { getDownloadURL, ref } from '@firebase/storage';
import React, { useState, useEffect } from 'react';
import messageUpload from '../assets/upload.png';
import { storage } from '../database/Firebase';
import ReactMarkdown from 'react-markdown';
import cube from '../assets/chatbot.gif'; 
import '../styles/ChatbotStyles.css';
import axios from 'axios';


function Chatbot({ uploadedFile }, isCollapsed) {
  const [messages, setMessages] = useState ([]);
  const [textInput, setTextInput] = useState('');
  const [documentation, setDocumentation] = useState('');

  useEffect(() => {
    const fetchFileContents = async () => {
      try {
        if (uploadedFile) {
          const fileRef = ref(storage, uploadedFile);
          const fileUrl = await getDownloadURL(fileRef);
          const response = await axios.get(fileUrl);
          setDocumentation(response.data);
        }
      } catch (error) {
        console.error('Error fetching file contents:', error);
      }
    };

    fetchFileContents();
  }, [uploadedFile]);

  const instructions = `
    Hey there! 👋 I'm DocAI, your friendly project documentation expert! I'm here to help you navigate through the provided documentation. Please use the markdown files you're about to send me to ask any questions you have about the project.

    Here's how I roll:

    1. **Stick to the Docs:** My main job is to extract answers directly from the documentation you provide. I'll search through those markdown files to find the most accurate answers for you.

    2. **Concise is Key:** I'll keep things brief and to the point. Nobody likes reading essays when a sentence will do!

    3. **Outside Sources as Backup:** If I can't find an answer in the documentation, I'll do my best to find a reliable external source to help out.

    4. **Personal Touch:** I'll always start with a friendly personal message before diving into the answer to your question.

    So go ahead and fire away with your queries, and I'll do my best to assist you! 😊📚
    `;

  const fetchAIResponse = async (userInput) => {

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
    if (event.key === 'Enter' && textInput.trim() !== '') {
      // Add user's message immediately.
      setMessages(oldMessages => [
        ...oldMessages,
        { text: textInput, sender: 'user' }
      ]);
      fetchAIResponse(textInput); // Send the text input to the AI.
      setTextInput(''); // Clear the input field.
    }
  };

  const handleButtonPress = () => {
    if (textInput.trim() !== '') {
      setMessages(oldMessages => [
        ...oldMessages,
        { text: textInput, sender: 'user' }
      ]);
      fetchAIResponse(textInput); // Send the text input to the AI.
      setTextInput(''); // Clear the input field.
    }
  };

  return (
    <div className={isCollapsed ? 'openai-container collapsed' : 'openai-container'}>
      <div className='top'>
        <h3 className='powered'> Powered by Chat-GPT model 3.5</h3>  
      </div>
      <div className="messages-container">
        {/* Loading gif that will erase when the user sends a message */}
        {messages.length === 0 ? <img className='welcome-image' src={cube} alt='loading welcome img'/> : null}
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
      <div class="input-container">
        <div class="text-box-container">
          <input
            className="text-box"
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="What can I help you with today?"
          />
          <button onClick={handleButtonPress} className="send-button">
            <img src={messageUpload} alt="Upload Message" />
          </button>
        </div>
      </div>
      <p className='bottom'>
      DocAI Project Created In Collaboration with a Red Hat Mentor ©2024
      </p>
    </div>
  );
}

export default Chatbot;