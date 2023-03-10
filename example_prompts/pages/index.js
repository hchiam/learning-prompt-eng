import Head from "next/head";
import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import styles from "./index.module.css";
import generatePrompt from "../helpers/generatePrompt";
import languageList from "../helpers/languageList";

export default function Home() {
  const [keyInput, setKeyInput] = useState("");
  const [languageInput, setLanguageInput] = useState("");
  const [wordInput, setWordInput] = useState("");
  const [result, setResult] = useState("");
  const [enableSubmit, setEnableSubmit] = useState(true);
  const [declutter, setDeclutter] = useState(false);

  /** call generate.js if running locally */
  async function callApiLocally() {
    setDeclutter(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: keyInput,
          language: languageInput,
          word: wordInput,
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
      setResult(data.result);
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

    setResult(
      `Generating mnemonic(s) for the ${languageInput} word "${wordInput}"...`
    );

    try {
      setDeclutter(true);
      const prompt = generatePrompt(languageInput, wordInput);
      console.log(prompt);
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

    if (!languageInput) {
      alert(`Please choose a language.`);
      return;
    }

    if (!String(wordInput).trim()) {
      alert(`Please choose a word.`);
      return;
    }

    setEnableSubmit(false);
    setResult("");

    // callApiLocally();

    await callApi(
      (result) => {
        console.log(result);
        setResult(result);
        setEnableSubmit(true);
      },
      (error) => {
        // Consider implementing your own error handling logic here
        console.error(error);
        alert(error);
        setEnableSubmit(true);
        setResult("");
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
        <img
          src="/logo.png"
          className={styles.icon + " " + (declutter ? styles.declutter : "")}
        />
        <h3 className={declutter ? styles.declutter : ""}>
          Enter a word in any language:
        </h3>
        <form onSubmit={onSubmit}>
          <select
            name="language"
            value={languageInput}
            onChange={(e) => setLanguageInput(e.target.value)}
            disabled={!enableSubmit}
          >
            <option value="">- Please select -</option>
            {languageList().map((x, i) => (
              <option key={i} value={x}>
                {x}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="word"
            placeholder="Enter a word you'd like mnemonics for."
            value={wordInput}
            onChange={(e) => setWordInput(limitInput(e.target.value))}
            disabled={!enableSubmit}
          />
          <input
            type="submit"
            value="Generate mnemonics"
            disabled={!enableSubmit}
          />
        </form>
        <div className={styles.result}>
          {String(result || "")
            .split("\n")
            .map((x, i) => (
              <p key={i}>{x}</p>
            ))}
        </div>
        <a href="/customer-support-demo">Customer Support Demo</a>
      </main>
    </div>
  );
}

function limitInput(text) {
  return text.trim().replace(/[ .]+/g, "").slice(0, 25);
}
