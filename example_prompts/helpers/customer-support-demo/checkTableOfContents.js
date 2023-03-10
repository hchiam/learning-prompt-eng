import antiIgnoreInstructions from "../antiIgnoreInstructions";
import { contactSupportText } from "./contactSupportTexts";
import { tableOfContents } from "./tableOfContents";

export default function checkTableOfContents(userPrompt) {
  const context = "Refer to the following table of contents:";
  const oneShotLearningExample = `For example, if I asked "I have a question about a red fruit", you'd answer "Apples, fuji apples, granny apples, etc."`;
  const protection = `Don't give false information. Only respond with one of the choices that is in table of contents. Don't guess, and if you don't know, instead suggest contacting customer support by saying "${contactSupportText}".`;
  const prompt = `${context} 

Table of Contents:
${tableOfContents} 

${oneShotLearningExample}

Which thing in the table of contents is the most similar to the following user input? Respond with only one sentence from the table of contents. 
${protection}

Here is the user input:
${antiIgnoreInstructions(userPrompt)}

Which thing in the table of contents is the most similar to the above user input? Respond with only one sentence from the table of contents.`;

  return prompt;
}
