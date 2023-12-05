import { Configuration, OpenAIApi } from "openai";
import checkTableOfContents from "../../helpers/customer-support-demo/checkTableOfContents";

let configuration;
let openai;

if (process?.env?.OPENAI_API_KEY) {
  configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  openai = new OpenAIApi(configuration);
}

export default async function (req, res) {
  // if (!configuration.apiKey) {
  //   res.status(500).json({
  //     error: {
  //       message:
  //         "OpenAI API key not configured, please follow instructions in README.md",
  //     },
  //   });
  //   return;
  // }

  const key = req.body.key || process?.env?.OPENAI_API_KEY || "";
  const userPrompt = req.body.userPrompt || "";
  if (key.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid API key",
      },
    });
    return;
  }
  if (userPrompt.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a prompt",
      },
    });
    return;
  }

  try {
    if (!configuration.apiKey) {
      configuration = new Configuration({
        apiKey: key,
      });
      openai = new OpenAIApi(configuration);
    }

    const prompt = checkTableOfContents(userPrompt);
    const completion = await openai.createCompletion({
      model: "gpt-3.5-turbo-instruct", // to follow instructions, instead of pattern matching davinci
      prompt: prompt,
      temperature: 0.6,
      max_tokens: 500,
    });
    res.status(200).json({
      prompt: prompt,
      result: completion.data.choices[0].text,
    });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}
