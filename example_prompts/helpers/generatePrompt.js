export default function generatePrompt(language, word) {
  console.log("language:\n\n", language);
  console.log("word:\n\n", word);

  // const prompt = `What is the ${language} word "${word}" in English? And then provide possible mnemonics that match the phonetic sounds of the entire ${language} word "${word}" as puns. Explain how the mnemonics help you remember the word by linking the pun to the English meaning.`;

  // one-shot learning prompt:
  const prompt = `Instructions: translate the ${language} word "${word}" into English, provide a source to check, and then provide 1-3 possible mnemonics that match the phonetic sounds of the entire ${language} word "${word}" as puns. Explain how the mnemonics help you remember the word by linking the pun to the English meaning. Don't use offensive words to make the puns. For example:

The French word "gare" means "railway station" in English. Check with this source: https://en.wiktionary.org/wiki/gare#French

Mnemonics:
1. "gare" sounds kind of like "Garfield", which you can visualize as Garfield grrring at the train.
2. "gare" sounds like "car", which you could remember how odd it'd be to see someone driving a car on the train tracks.

Now for the ${language} word "${word}": `;

  console.log("prompt:\n\n", prompt);
  return prompt;
}
