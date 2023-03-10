# Example prompts

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
