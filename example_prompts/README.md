# Example prompts

1. [`can you please eli5 prompt engineering`](https://github.com/hchiam/learning-prompt-eng/blob/main/example_prompts/1_Screenshot_20230223-215224.png)
2. [`what are some pun-based mnemonics for the sounds of the entire words as puns for <list of words> in <language>` (implied from the conversation)](https://github.com/hchiam/learning-prompt-eng/blob/main/example_prompts/2_example-mnemonic-generator-conversation-refining-prompt.txt)
3. [`Explain Prompt Engineering to me in 5 sentences, and then quiz me on it but don't give me the answers until after I respond, and also rate my answers. Please ask only three questions and ask them one at a time, and let me answer the first question before you ask the next questions.
`](https://github.com/hchiam/learning-prompt-eng/blob/main/example_prompts/3_example-pe-quiz-conversation-refining-prompt.txt)

You can see an example conversation here, showing an attempt at getting ChatGPT to produce responses that are progressively more relevant: https://github.com/hchiam/learning-prompt-eng/blob/main/example_prompts/2_example-mnemonic-generator-conversation.txt

## Interactive demo

This demo is a modified version of https://github.com/openai/openai-quickstart-node

For more info: https://beta.openai.com/docs/quickstart

### Setup

```sh
npm install # or yarn

cp .env.example .env
# or in Windows powershell: copy .env.example .env

# edit .env with your OPENAI_API_KEY
```

## Run

```sh
npm run dev # or yarn dev
# http://localhost:3000
```

## Deploy

```sh
yarn deploy
# https://hchiam-example-prompts.surge.sh
```
