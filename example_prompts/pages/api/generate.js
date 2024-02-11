import { Configuration, OpenAIApi } from "openai";
import generatePrompt from "../../helpers/generatePrompt";
import getCompletion from "../../helpers/getCompletion";

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
  const language = req.body.language || "";
  const word = req.body.word || "";
  if (key.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid API key",
      },
    });
    return;
  }
  if (language.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid language",
      },
    });
    return;
  }
  if (word.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid word",
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

    const prompt = generatePrompt(language, word);
    const completion = await getCompletion(openai, prompt);
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
