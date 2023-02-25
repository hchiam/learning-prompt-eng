# Learning prompt engineering

Just one of the things I'm learning. https://github.com/hchiam/learning

- prompt engineering is apparently around 2-3 years old! (as of 2023)
- do prompt engineering to most effectively use new models as they currently are?

## Read

- **_what is it?_** (basically adding text around the user input to prime the model for the kinds of output it should give, like giving it context for the input and a description of the expected output, and even the start of the expected output) https://en.wikipedia.org/wiki/Prompt_engineering and https://fourweekmba.com/prompt-engineering/
- **_why bother?_** clear communication is hard, especially when you need to understand how an ML model understands things (like broader considerations, context, and interpretations of words), and you need to run experiments to understand an effectively black box system, and avoid unintentionally making the model learn the wrong things or respond with the wrong things, and draw on many fields (deep learning, linguistics, psychology, computer security, philosophy, and for image generation, art history) https://simonwillison.net/2023/Feb/21/in-defense-of-prompt-engineering/
- **_but a little humility reminder:_** prompt injection can leak your IP (your prepended text that's supposed to be kept secret) or circumvent your prepended instructions, and it seems currently hard to fix https://simonwillison.net/2022/Sep/12/prompt-injection (note the follow-up links too)

## To read

- **_learn it?_ https://learnprompting.org**
- **_read up Claude vs ChatGPT:_** https://pub.towardsai.net/the-ai-behind-claude-the-chatgpt-competitor-that-has-raised-over-1-billion-5e60823a2dee?gi=ebedf7e219e4
- **play with [ChatGPT](https://chat.openai.com) or Claude (no test link right now?) to come up with complex behaviors/tasks done from a series of well crafted prompts**
- **_explore examples?_** https://www.reddit.com/r/PromptDesign

<hr>
<hr>

## According to https://chat.openai.com:

<img src="https://github.com/hchiam/learning-prompt-eng/raw/main/screenshots/Prompt_Engineering_Explanation_ELI5.png" height="500rem">

## Example prompts

```sh
npx vite
```

Or using [`yarn`](https://github.com/hchiam/learning-yarn):

```sh
yarn
```

```sh
yarn dev
```
