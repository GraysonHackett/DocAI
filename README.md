# DocAI

## <u>Overview</u>

This repo hosts a capstone class project developed in collaboration with the College of Charleston and a Red Hat distinguished engineer mentor. The projects aim was to create a new way to assist developers in reading, interacting, and understanding documentation more efficiently. DocAI connectes the power of AI into a chatbot that allows you to interact directly with your project documentation. 

## <u>Setup Instructions</u>

To run the project utilizing the OpenAI model, follow these setup instructions:

1. Clone the repository to your local machine:
   ```sh 
   git clone https://github.com/GraysonHackett/DocAI
   ```
2. Update all dependencies with terminal command: 
   ```sh
   npm install 
   ```   
3. Create a `.env` file in the project root directory and add your (ChatGPT-API & Firebase) private key's to it. The file should look like this:
   ```js
   REACT_APP_API_KEY=your_openai_api_key_here
   
   REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
   REACT_APP_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
   ```
4. Run the project using the following command:
   ```sh
   npm start
   ```

**<i>To run the project locally utilizing the Ollama API, follow these setup instructions:</i>**

1. Download Ollama to your machine:
   
   https://ollama.com

2. Download the latest ollama version:
   ```sh
   npm install ollama
   ```

3. Pull the `llama2` model:
   ```sh
   ollama pull llama2
   ```
   
### <u>Dependencies Used</u>

> `openai`: Used for accessing the OpenAI API and its elements.<br>
> `axios`: Used for sending HTTP requests to the OpenAI API.<br>
> `dotenv`: Used for loading environment variables from the `.env` file.<br>
> `node-fetch`: Used for making HTTP requests in the Node.js environment, mainly used for fetching Markdown files from a URL.<br>
> `react-markdown`: Used for rendering Markdown content in React components.<br>
> `react-router-dom`: Used for handling routing in React applications.<br>
> `Ollama`: Used for accessing multiple different LLM's and offline use for privacy concerns.

### <u>Functionality Overview</u>

The `Chatbot.js` file outlines our chatbot setup within the function `OpenAiAPI`

- With each API request, the instructions, selected documentation, and users prompt will be sent to the API

```js
const response = await axios.post(
        url,
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 100,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
```

The snippet shows how we use Axios to send a POST request to the API URL, including what model of GPT we want to use, our message, and the token limit the user has available. It waits for the response, which will be stored in the 'response' variable and be later given back to the user.

### <u>Component Structure</u>

The component structure is as follows:

> textInput: State variable to store the user's input message.<br>
> messages: State variable to store all the messages exchanged between the user and the AI.<br>
> documentation: State variable to store the content of the uploaded documentation file.<br>

### <u>API Integration</u>

The component interacts with the OpenAI API using the Axios-dependency to send requests. It sends instructions, Markdown files, and user input messages to the API and receives responses, before formatting them back to the user.

## <u>Conclusion</u>

This project demonstrates the integration of an AI-powered chatbot into a React application for assisting developers in understanding project documentation more effectively.For any issues or suggestions, please feel free to open an issue in the GitHub repository.

![DocAI](/src/assets/Demo.png)