export default async function getCompletion(openai, prompt) {
  return await openai.createCompletion({
    model: "gpt-3.5-turbo-instruct", // to follow instructions, instead of pattern matching davinci
    prompt: prompt,
    temperature: 0.6,
    max_tokens: 500,
  });
}
