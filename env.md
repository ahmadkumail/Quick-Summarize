# Environment Variables

To deploy this project to a hosting provider like Vercel, you need to set the following environment variable in your project's deployment settings:

- `GEMINI_API_KEY`: Your API key for the Google AI SDK.

You can get your API key from Google AI Studio.

## How to add environment variables on Vercel:

1.  Go to your project's dashboard on Vercel.
2.  Click on the "Settings" tab.
3.  In the left sidebar, click on "Environment Variables".
4.  Add a new variable with the key `GEMINI_API_KEY` and paste your API key as the value.
5.  Make sure the variable is available for all environments (Production, Preview, and Development).
6.  Save the changes and redeploy your project.

This will ensure that your deployed application has access to the necessary API key to make summarization requests to the AI model.
