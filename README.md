# DocAI - Temp README as of (03/01)

## <u>Overview</u>

This project is a capstone class project developed in collaboration with the College of Charleston and RedHat. The aim of this project is to create a new way to assist developers in reading and understanding documentation more efficiently.

## <u>Setup Instructions</u>

To run the project locally, follow these setup instructions:

1. Clone the repository to your local machine:
   ```sh 
   git clone https://github.com/GraysonHackett/DocAI
   ```
2. Install the necessary dependencies by running the following command in your terminal:
   ```sh
   npm install axios dotenv node-fetch openai react-markdown
   ```
3. Update all dependencies with terminal command: 
   ```sh
   npm install 
   ```   
4. Create a `.env` file in the project root directory and add your OpenAI API key to it. The file should look like this:
   ```js
   REACT_APP_API_KEY=your_openai_api_key_here
   ```
5. Run the project using the following command:
   ```sh
   npm start
   ```

## <u>Code Explanation</u>

The main component of the project is the `Chatbot.js` file, which contains the implementation of the chatbot using React.

### <u>Dependencies Used</u>

> `openai`: Used for accessing the OpenAI API and its elements.<br>
> `axios`: Used for sending HTTP requests to the OpenAI API.<br>
> `dotenv`: Used for loading environment variables from the `.env` file.<br>
> `node-fetch`: Used for making HTTP requests in the Node.js environment, mainly used for fetching Markdown files from a URL.<br>
> `react-markdown`: Used for rendering Markdown content in React components.

### <u>Functionality Overview</u>

The `Chatbot.js` file outlines our chatbot setup within the function `OpenAiAPI`

- Initial instructions and documentation will be sent to the OpenAI API when the component mounts.
- It sends user input messages to the OpenAI API and displays the response from the AI.

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
> uploadedFile: Prop representing the uploaded documentation file.<br>
> instructionSent and filesSent: State variables to keep track of whether initial instructions and Markdown files have been sent to the API.

### <u>API Integration</u>

The component interacts with the OpenAI API using Axios to send requests. It sends instructions, Markdown files, and user input messages to the API and receives responses.

## <u>Conclusion</u>

This project demonstrates the integration of an AI-powered chatbot into a React application for assisting developers in understanding project documentation more effectively.For any issues or suggestions, please feel free to open an issue in the GitHub repository.

![image](https://venturebeat.com/wp-content/uploads/2021/09/Red-Hat-e1684880569131.jpg?w=1200&strip=all)
