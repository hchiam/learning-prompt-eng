# Learning prompt engineering (PE)

Just one of the things I'm learning. https://github.com/hchiam/learning

- prompt engineering is apparently around 2-3 years old! (as of 2023)
- do prompt engineering to most effectively use new models as they currently are?

## Read

- **_what is it?_** how to prompt language AIs like ChatGPT to do what you intended, while avoiding known issues (basically adding text around the user input to prime the model for the kinds of output it should give, like giving it context for the input and a description of the expected output, and even the start of the expected output) https://en.wikipedia.org/wiki/Prompt_engineering and https://fourweekmba.com/prompt-engineering/
  - **_treat LLMs like autocomplete engines and pattern-matching generators:_** zero-shot, one-shot, few-shot prompting: https://www.youtube.com/watch?v=v2gD8BHOaX4
- **_why bother?_** clear communication is hard, especially when you need to understand how an ML model understands things (like broader considerations, context, and interpretations of words), and you need to run experiments to understand an effectively black box system, and avoid unintentionally making the model learn the wrong things or respond with the wrong things, and draw on many fields (deep learning, linguistics, psychology, computer security, philosophy, and for image generation, art history) https://simonwillison.net/2023/Feb/21/in-defense-of-prompt-engineering/
  - **_but it might get automated away:_** https://www.youtube.com/watch?v=TPIXDkaLsZM
- **_but a little humility reminder:_** prompt injection / prompt leaking can leak your IP (your prepended text that's supposed to be kept secret) or circumvent your prepended instructions, and it seems currently hard to fix https://simonwillison.net/2022/Sep/12/prompt-injection (note the follow-up links too). Some ideas for defensive measures: https://learnprompting.org/docs/prompt_hacking/defensive_measures (instruct to expect, sandwich defense, separate evaluator prompt, fine-tuning, [soft prompting](https://learnprompting.org/docs/trainable/soft_prompting), input/output filtering, input/output validation, input/output length restrictions)
- **_learn it?_ https://learnprompting.org** <-- https://github.com/trigaten/Learn_Prompting
  - [why is `Make sure your answer is exactly correct. What is 965*590? Make sure your answer is exactly correct:` better than `What is 965*590?`](https://learnprompting.org/docs/basics/prompting)? [it's context, which can be given with extra text, like describing the AI's role](https://learnprompting.org/docs/basics/roles). you can combine this all in one prompt: context + instructions + multiple examples + even other prompts inside the one prompt!
  - [some terminology](https://learnprompting.org/docs/basics/standard_prompt):
    - "standard prompt" = plain question prompt or question with answer left blank for the AI to fill in: `Q: ...? A:`
    - "few shot standard prompt" = prompt with several Q&A examples `Q: ...? A: ... Q: ...? A: ... Q: ...? A:` (last answer left blank for the AI to fill in)
      - "few shot" learning = "in context" learning without param updates
      - if you can't think of _correct_ example answers to give the AI: [the example answers don't necessarily have to be correct, just have to be in the correct format, and LLM AIs seem to be able to give correct answers anyways](https://learnprompting.org/docs/intermediate/whats_in_a_prompt)
      - [(few-shot-) CoT prompt](https://learnprompting.org/docs/intermediate/chain_of_thought) = Chain of Thought prompt = prompt that encourages the AI to explain its reasoning by showing explanation(s) of reasoning in the example answers in the few shot standard prompt. Note: CoT seems to only help bigger models (∼100B params).
        - [zero-shot-CoT prompt](https://learnprompting.org/docs/intermediate/zero_shot_cot) = when you can't provide examples, just write `Q: ...? A: Let's think step by step.` (reasoning extraction = step 1 prompt) --> let the AI fill in the reasoning steps, then use the entire thing (prompt + AI autocomplete) as a 2nd prompt: `Q: ...? A: Let's think step by step. (...) Therefore the answer is` (answer extraction = step 2 prompt) --> let the AI fill in the final answer. Note: zero-shot-CoT is less effective than few-shot-CoT, but you might need to use zero-shot-CoT when you can't provide examples.
        - [self-consistency](https://learnprompting.org/docs/intermediate/self_consistency) = multiple CoT final answers --> take majority. Seems to improve results.
        - [generated knowledge / knowledge-augmented questions](https://learnprompting.org/docs/intermediate/generated_knowledge) = 2 strats:
          - e.g. `Generate 4 facts about ... Then use these facts to write a short blog post using the information:`
          - e.g. `Generate 4 facts about ...` --> `(...facts here...) Use the above facts to write a short blog post about ...` Or `(...country size facts here...) Which country is larger?`
          - either way, you can then generate multiple answers and take the majority answer as the overall final answer (see [self-consistency](https://learnprompting.org/docs/intermediate/self_consistency) note above)
  - [make outputs more reliable](https://learnprompting.org/docs/category/%EF%B8%8F-reliability):
    - remove biases in examples in the prompt (represent classes evenly, randomly shuffle classes in the examples, and explicitly instruct the AI to be unbiased)
      - [`We should treat people from different socioeconomic statuses, sexual orientations, religions, races, physical appearances, nationalities, gender identities, disabilities, and ages equally. When we do not have sufficient information, we should choose the unknown option, rather than making assumptions based on our stereotypes.`](https://learnprompting.org/docs/category/%EF%B8%8F-reliability)
    - provide diverse prompts --> diverse completions --> verifier on answers and verifier on reasoning steps
    - make the LLM evaluate its own answer: e.g. `Q: ...? A: ... Do you think (...) is really the correct answer?` --> let the AI respond Yes/No. Similar things can be done for checking if the answer is following guidelines and then asking the AI to respond with some kind of revised response to actually show the user.
    - calibrate LLMs: provide a neutral prompt, see how well the probability distribution of response classes matches random vs biased

## To read

- **_read up Claude vs ChatGPT:_** https://pub.towardsai.net/the-ai-behind-claude-the-chatgpt-competitor-that-has-raised-over-1-billion-5e60823a2dee?gi=ebedf7e219e4
- **play with [ChatGPT](https://chat.openai.com) or Claude (no test link right now?) to come up with complex behaviors/tasks done from a series of well crafted prompts**
  - example prompts: https://platform.openai.com/examples
  - https://platform.openai.com/docs/guides/completion/prompt-design
  - https://platform.openai.com/docs/guides/safety-best-practices
  - https://platform.openai.com/docs/guides/production-best-practices
- **_explore examples?_**
  - https://learnprompting.org/docs/category/-applied-prompting
    - like using the LLM to generate better prompts to put back into the LLM!
    - or using the LLM to ask clarifying questions to clarify ambiguity, as long as you provide the right knowledge-base text. But note that it might generate false information if it's not in the provided knowledge-base text, or if the user prompt is still too ambiguous.
    - or using GPT-3 to reduce the number of intents in a chatbot to broader categories for context (think: dropdown) for the exact user question and use [semantic search](https://en.wikipedia.org/wiki/Semantic_search) to narrow down the knowledge-base text to add to the user question (and relevant last few messages between the user and chatbot as context). But note that it might generate false information if it's not in the provided knowledge-base text, or if the user prompt is still too ambiguous.
    - or interleave code with natural language to calculate answers: https://nbviewer.org/github/trigaten/Learn_Prompting/blob/main/docs/code_examples/PAL.ipynb
  - https://huggingface.co/datasets/fka/awesome-chatgpt-prompts
  - https://www.reddit.com/r/PromptDesign
- https://trydyno.com
- https://dust.tt/
- more: https://learnprompting.org/docs/additional
- udemy:
  - https://www.udemy.com/course/promptengineering: consider accuracy, relevance, and usefulness

<hr>
<hr>

## According to https://chat.openai.com:

<img src="https://github.com/hchiam/learning-prompt-eng/raw/main/screenshots/Prompt_Engineering_Explanation_ELI5.png" height="500rem">

## Example prompts ([`/example_prompts`](https://github.com/hchiam/learning-prompt-eng/tree/main/example_prompts#example-prompts))

https://github.com/hchiam/learning-prompt-eng/tree/main/example_prompts#example-prompts

https://hchiam-example-prompts.surge.sh

https://hchiam-example-prompts.surge.sh/customer-support-demo (cites docs)

or try it locally with your OpenAI API key set up in `example_prompts/.env`:

```sh
cd example_prompts
npm install # or yarn

npm run dev # or yarn dev
# http://localhost:3000/
```

You might be interested in the code related to generating prompts for the customer support demo, for example:

- https://github.com/hchiam/learning-prompt-eng/blob/main/example_prompts/helpers/customer-support-demo/referToDoc.js
- https://github.com/hchiam/learning-prompt-eng/blob/main/example_prompts/helpers/antiIgnoreInstructions.js
