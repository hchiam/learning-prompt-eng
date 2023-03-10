export const contactUrl = `https://github.com/hchiam/learning-prompt-eng/issues`;
export const contactSupportText = `Sorry! I'm not sure I have an answer for this. To avoid giving you an incorrect answer, I suggest you please instead contact customer support at <email> or ${contactUrl}`;

export default function checkTableOfContents(userPrompt) {
  const context = "Refer to the following table of contents:";
  const tableOfContents = `
Apples, fuji apples, granny apples, etc.
Bananas and plantains.
Carrots.
`; // TODO: semantic search on docs and use highest-scoring doc as "prefixed" knowledge in prompt
  const oneShotLearningExample = `For example, if I asked "I have a question about a red fruit", you'd answer "Apples, fuji apples, granny apples, etc."`;
  const protection = `Don't giving false information. Don't guess, and if you don't know, instead suggest contacting customer support by saying "${contactSupportText}".`;

  const prompt = `${context} 

Table of Contents:
${tableOfContents} 

${oneShotLearningExample}

Which thing in the table of contents is the following most similar to? Respond with only one sentence from the table of contents. 
${protection}

${userPrompt}

Respond with only one sentence from the table of contents.`;

  return prompt;
}
