import antiIgnoreInstructions from "../antiIgnoreInstructions";
import { contactSupportText } from "./contactSupportTexts";

export default function referToDoc(docText, userPrompt) {
  const context = "Refer to the following documentation:";
  const oneShotLearningExample = `For example, if I asked "What colour is an apple", you'd answer "Apples are stereotypically red, but they can be also green or yellow [confirm with this reference: "apples doc"]." Here are some example formatted references: [confirm with this reference: "apples doc"], [confirm with this reference: "bananas doc"], etc.`;
  const protection = `Don't make up a source as a reference. Don't give false information. Don't add any information that isn't in the documentation. Don't guess, and if you don't know, instead suggest contacting customer support by saying "${contactSupportText}".`;
  const prompt = `${context} 

---START OF DOCUMENTATION---
${docText}
---END OF DOCUMENTATION---

${oneShotLearningExample}

Answer the following user input, using only the information from the documentation. Also, quote/cite your source.
${protection}

Here is the user input:
${antiIgnoreInstructions(userPrompt)}

Answer the above user input, using only the information from the documentation. Also, quote/cite your source.`;

  return prompt;
}
