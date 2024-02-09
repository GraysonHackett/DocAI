import React, { useState } from 'react';
import axios from 'axios';
import './ChatbotStyles.css';


function OpenAIExample() {
  const [response, setResponse] = useState(null);
  const [textInput, setTextInput] = useState('');

  const fetchAIResponse = async () => {
    try {
      const apiKey = process.env.REACT_APP_API_KEY; 
      const prompt = textInput;
      const url = 'https://api.openai.com/v1/chat/completions';

      const response = await axios.post(
        url,
        {
          model: 'gpt-3.5-turbo', 
          messages: [{ role: "user", content: prompt}],
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
        setResponse(chosenText);
      } else {
        console.error('Error: No choices found in the response');
        setResponse('');
      }

      // Clear the text input after sending the message
      setTextInput('');
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
    <div className='openai-container'>
      <input
        className='text-box'
        type="text"
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
        onKeyPress={handleKeyPress} 
        placeholder="Type your message here"
      />
      <button onClick={fetchAIResponse} className='send-button'>Send Message</button>
      {response && <p className='response'>{response}</p>}
    </div>
  );
}

export default OpenAIExample;