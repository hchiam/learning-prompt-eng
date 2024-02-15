import React from "react";
import { useState, useEffect } from "react";
import {
  critiqueMnemonics,
  getRefinedMnemonics,
} from "../helpers/evaluateMnemonics";
import removeNonWiktionaryLinks from "../helpers/removeNonWiktionaryLinks";
import getCompletion from "../helpers/getCompletion";
import formattedLog from "../helpers/formattedLog";
import { Configuration, OpenAIApi } from "openai";
import sharedStyles from "../pages/index.module.scss";
import styles from "./refinement.module.scss";
import { scroll } from "../helpers/scroll";
import Tooltip from "./tooltip";
import {
  RefineTooltipContentStep2,
  RefineTooltipContentStep3,
} from "./tooltipTexts";
import Tippy from "@tippyjs/react";

export default function Refinement({ apiKey, mnemonicsOutput }) {
  const [refinedOutput, setRefinedOutput] = useState("");
  const [refiningText, setRefiningText] = useState("Refining...");

  let interval;

  const configuration = new Configuration({
    apiKey: apiKey,
  });
  const openai = new OpenAIApi(configuration);

  useEffect(() => {
    populate();
  }, [apiKey, mnemonicsOutput]);

  useEffect(() => {
    scroll();
    animateRefiningText();
  }, [refinedOutput]);

  function animateRefiningText() {
    clearInterval(interval);
    let x = 0;
    interval = setInterval(() => {
      x = (x + 1) % 4;
      setRefiningText("Refining" + ".".repeat(x));
    }, 500);
  }

  async function populate() {
    try {
      const critiquedOutputPrompt = critiqueMnemonics(mnemonicsOutput);
      const completion2 = await getCompletion(openai, critiquedOutputPrompt);
      const critiquedOutput = completion2.data.choices[0].text;
      formattedLog(`%ccritiquedOutput:%c\n\n${critiquedOutput}`);

      const refinedOutputPrompt = getRefinedMnemonics(
        mnemonicsOutput + "\n\n" + critiquedOutput
      );
      const completion3 = await getCompletion(openai, refinedOutputPrompt);
      let finalOutput = completion3.data.choices[0].text;
      finalOutput = removeNonWiktionaryLinks(finalOutput);
      finalOutput = finalOutput.replace(/https?:\/\//g, "");
      setRefinedOutput(finalOutput);
      formattedLog(
        `%crefinedOutput/finalOutput:%c\n\n${refinedOutput}\n\n${finalOutput}`
      );

      clearInterval(interval);
    } catch (error) {
      // Consider adjusting the error handling logic for your use case
      if (error.response) {
        console.error(error.response.status, error.response.data);
      } else {
        console.error(`Error with OpenAI API request: ${error.message}`);
      }
    }
  }

  return (
    <>
      {refinedOutput ? (
        <Tippy
          content={<RefineTooltipContentStep2 />}
          // useAnimateFill={false}
          placement="left"
        >
          <Tippy
            content={<RefineTooltipContentStep3 />}
            // useAnimateFill={false}
            placement="right"
          >
            <div tabIndex="0" className={styles.container}>
              <h2 style={{ marginBottom: 0 }}>Refined Version:</h2>
              <div
                className={sharedStyles.result}
                style={{ marginTop: 0, paddingTop: 0 }}
              >
                {String(refinedOutput || "")
                  .trim()
                  .split("\n")
                  .map((x, i) => (
                    <p key={i}>{x}</p>
                  ))}
              </div>
            </div>
          </Tippy>
        </Tippy>
      ) : (
        <h2 className={styles.waiting}>{refiningText}</h2>
      )}
    </>
  );
}
