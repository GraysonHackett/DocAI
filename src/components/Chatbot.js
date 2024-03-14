import React, { useState } from 'react';
import axios from 'axios';
import '../styles/ChatbotStyles.css';
import ReactMarkdown from 'react-markdown';

function Chatbot({ uploadedFile }) {
  const [messages, setMessages] = useState([]);
  const [textInput, setTextInput] = useState('');
  const [documentation, setDocumentation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // TODO: add personality to chatbot and test it "hi im docai".....
  const instructions =
    'Please use the markdown files I am about to send to you, to answer questions about the provided project documentation. Only get answers from the documentation and when not possible, give the best answer utilizing outside sources. Make sure to make the answers as concise as possible, and even copy and paste answers from the documentation when necessary';

  const fetchAIResponse = async (userInput) => {
    setIsLoading(true); // Indicate that AI is processing the response.
    try {
      if (!documentation && uploadedFile) {
        const fileContents = await readFile(uploadedFile);
        setDocumentation(fileContents.trim());
      }
      const prompt = `${instructions} \n\n ${documentation} \n\n ${userInput}`;


      const apiKey = process.env.REACT_APP_API_KEY;
      const aiPrompt = `${instructions} \n\n ${documentation} \n\n ${textInput}`;
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
    } finally {
      setIsLoading(false); // Stop loading once the response is processed.
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