import Head from "next/head";
import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import styles from "./customer-support-demo.module.css";
import checkTableOfContents, {
  contactUrl,
  contactSupportText,
} from "../helpers/customer-support-demo/checkTableOfContents";

const maxUserPromptLength = 50;

export default function CustomerSupportDemo() {
  const [conversation, setConversation] = useState([]); // TODO
  const [keyInput, setKeyInput] = useState("");
  const [userPrompt, setUserPrompt] = useState("");
  const [botOutput, setBotOutput] = useState("");
  const [enableSubmit, setEnableSubmit] = useState(true);
  const [declutter, setDeclutter] = useState(false);

  /** call generate.js if running locally */
  async function callApiLocally() {
    setDeclutter(true);
    try {
      const response = await fetch("/api/checkTableOfContents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: keyInput,
          userPrompt: userPrompt,
        }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      console.log(data.prompt);
      setBotOutput(data.result);
      setEnableSubmit(true);
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
      setEnableSubmit(true);
      setDeclutter(false);
    }
  }

  /** call this since you can't call generate.js if running on a demo site */
  async function callApi(onSuccess, onError) {
    const configuration = new Configuration({
      apiKey: keyInput,
    });
    const openai = new OpenAIApi(configuration);

    try {
      setDeclutter(true);
      const prompt = checkTableOfContents(userPrompt);
      const completion = await openai.createCompletion({
        model: "text-davinci-003", // to follow instructions, instead of pattern matching davinci
        prompt: prompt,
        temperature: 0.6,
        max_tokens: 500,
      });
      if (onSuccess) onSuccess(completion.data.choices[0].text);
    } catch (error) {
      setDeclutter(false);
      // Consider adjusting the error handling logic for your use case
      if (error.response) {
        console.error(error.response.status, error.response.data);
        if (onError) {
          onError(
            `Error with OpenAI API request: ${error.response.data.error.message}`
          );
        }
      } else {
        console.error(`Error with OpenAI API request: ${error.message}`);
        if (onError) {
          onError(`Error with OpenAI API request: ${error.message}`);
        }
      }
    }
  }

  async function onSubmit(event) {
    event.preventDefault();

    if (!String(userPrompt).trim()) return;

    setEnableSubmit(false);

    // callApiLocally();

    await callApi(
      (result) => {
        setEnableSubmit(true);
        setBotOutput(result);
      },
      (error) => {
        // Consider implementing your own error handling logic here
        console.error(error);
        alert(error);
        setEnableSubmit(true);
      }
    );
  }

  return (
    <div>
      <Head>
        <title>Example prompts</title>
        <link rel="icon" href="/logo.png" />
      </Head>

      <main className={styles.main}>
        <p className={declutter ? styles.declutter : ""}>
          To find or create your OpenAI API key, go to{" "}
          <a
            href="https://platform.openai.com/account/api-keys"
            target="_blank"
          >
            https://platform.openai.com/account/api-keys
          </a>
        </p>
        <input
          type="password"
          name="key"
          placeholder="Enter your OpenAI API key."
          value={keyInput}
          onChange={(e) => setKeyInput(e.target.value)}
          disabled={!enableSubmit}
          className={
            styles["api-key"] + " " + (declutter ? styles.declutter : "")
          }
        />
        <h3>Customer Support Demo:</h3>
        <p>
          {userPrompt
            ? maxUserPromptLength - userPrompt.length + " left"
            : "Max length: " + maxUserPromptLength}
        </p>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="word"
            placeholder="Enter your question."
            value={userPrompt}
            onChange={(e) => setUserPrompt(preprocessUserInput(e.target.value))}
            disabled={!enableSubmit}
          />
          <input type="submit" value="Send" disabled={!enableSubmit} />
        </form>
        <div className={styles.result}>
          {String(botOutput || "")
            .split("\n")
            .map((x, i) => (
              <p key={i}>{convertSupportTextToHtml(x)}</p>
            ))}
        </div>
        <a href="/">Home</a>
      </main>
    </div>
  );
}

function preprocessUserInput(text) {
  if (!text || !text.length) return text;
  const sentenceCase = text[0].toUpperCase() + text.slice(1);
  return sentenceCase.slice(0, maxUserPromptLength);
}

function convertSupportTextToHtml(text) {
  if (!text) return text;
  if (!text.includes(contactSupportText)) return text;
  return (
    <span>
      {text
        .split(contactSupportText)
        .slice(-1)
        .flatMap((item) => [
          <span>
            {`Sorry! I'm not sure I have an answer for this. To avoid giving you an incorrect answer, I suggest you please instead contact customer support at \<email\> or `}
            <a href={contactUrl} target="_blank">
              {contactUrl}
            </a>
          </span>,
        ])}
    </span>
  );
}
