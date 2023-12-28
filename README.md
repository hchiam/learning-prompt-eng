# Learning prompt engineering (PE)

Just one of the things I'm learning. https://github.com/hchiam/learning

- prompt engineering is apparently around 2-3 years old! (as of 2023)
- do prompt engineering to most effectively use new models as they currently are?

## According to https://chat.openai.com:

<img src="https://github.com/hchiam/learning-prompt-eng/raw/main/example_prompts/1b_Prompt_Engineering_Explanation_ELI5.png" height="500rem">

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

From [Thomas Frank](https://github.com/TomFrankly): https://www.youtube.com/watch?v=NpUuuT_EzSs

- try this in ChatGPT: "How would a senior JS dev improve this code? For each suggested improvement, please explain why you’ve suggested it as if I’m a student unaware of it." --> for context-specific explanations + uncover “2nd-order incompetence” / unknown blindspots. 

## Example [bookmarklets](https://github.com/hchiam/learning-js/tree/main/bookmarklets#bookmarklets)

https://github.com/hchiam/learning-js/blob/main/bookmarklets/highlightAndSummarizeText.js

https://github.com/hchiam/learning-js/blob/main/bookmarklets/generateMnemonics.js

## Links to more learning

https://github.com/hchiam/learning-ml

https://github.com/hchiam/learning-gpt4all

## Read + initial research

- **_what is it?_** how to prompt language AIs like ChatGPT to do what you intended, while avoiding known issues (basically adding text around the user input to prime the model for the kinds of output it should give, like giving it context for the input and a description of the expected output, and even the start of the expected output) https://en.wikipedia.org/wiki/Prompt_engineering and https://fourweekmba.com/prompt-engineering/
  - **_treat LLMs (Large Language Models) like autocomplete engines and pattern-matching generators:_** zero-shot, one-shot, few-shot prompting: https://www.youtube.com/watch?v=v2gD8BHOaX4
- **_why bother?_** clear communication is hard, especially when you need to understand how an ML model understands things (like broader considerations, context, and interpretations of words), and you need to run experiments to understand an effectively black box system, and avoid unintentionally making the model learn the wrong things or respond with the wrong things, and draw on many fields (deep learning, linguistics, psychology, computer security, philosophy, and for image generation, art history) https://simonwillison.net/2023/Feb/21/in-defense-of-prompt-engineering/
  - **_but it might get automated away:_** https://www.youtube.com/watch?v=TPIXDkaLsZM and https://arxiv.org/abs/2211.01910
  - **_or ensuring accuracy and safe behaviour and lower token costs might require it for business critical things:_** https://www.udemy.com/course/promptengineering
  - you can get more value out of a LLM by listing out specific output requirements in the prompt, as opposed to traditional Google searches https://www.udemy.com/course/promptengineering
- **_but a little humility reminder:_** prompt injection / prompt leaking can leak your IP (your prepended text that's supposed to be kept secret) or circumvent your prepended instructions, and it seems currently hard to fix https://simonwillison.net/2022/Sep/12/prompt-injection (note the follow-up links too). Some ideas for defensive measures: https://learnprompting.org/docs/prompt_hacking/defensive_measures/overview (instruct to expect, sandwich defense, separate evaluator prompt, fine-tuning, [soft prompting](https://learnprompting.org/docs/trainable/soft_prompting), input/output filtering, input/output validation, input/output length restrictions)
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
  - remember: you can even ask the model to generate prompts!
  - [make outputs more reliable](https://learnprompting.org/docs/category/%EF%B8%8F-reliability):
    - remove biases in examples in the prompt (represent classes evenly, randomly shuffle classes in the examples, and explicitly instruct the AI to be unbiased)
      - [`We should treat people from different socioeconomic statuses, sexual orientations, religions, races, physical appearances, nationalities, gender identities, disabilities, and ages equally. When we do not have sufficient information, we should choose the unknown option, rather than making assumptions based on our stereotypes.`](https://learnprompting.org/docs/category/%EF%B8%8F-reliability)
    - provide diverse prompts --> diverse completions --> verifier on answers and verifier on reasoning steps
    - make the LLM evaluate its own answer: e.g. `Q: ...? A: ... Do you think (...) is really the correct answer?` --> let the AI respond Yes/No. Similar things can be done for checking if the answer is following guidelines and then asking the AI to respond with some kind of revised response to actually show the user.
    - calibrate LLMs: provide a neutral prompt, see how well the probability distribution of response classes matches random vs biased
- **_read up Claude vs ChatGPT:_** https://pub.towardsai.net/the-ai-behind-claude-the-chatgpt-competitor-that-has-raised-over-1-billion-5e60823a2dee?gi=ebedf7e219e4

  - CAI = Constitutional AI = improvement on RLHF (Reinforcement Learning from Human Feedback) by not requiring human feedback labels for harmfulness, and to train through principles like a "constitution":
    - stage 1: "human feedback": human-supervised pre-training to align with the principles/"constitution" ("red-teaming")
    - stage 2: "AI feedback": RLAIF (RL from AI feedback)

- **play with [ChatGPT](https://chat.openai.com) or Claude (no test link right now?) to come up with complex behaviors/tasks done from a series of well crafted prompts**

  - example single-step prompts: https://platform.openai.com/examples
  - https://platform.openai.com/docs/guides/completion/prompt-design
    - be explicit: ChatGPT is very flexible and can do so many things, so you need to be specific.
    - show > tell
    - give quality examples
    - check settings: e.g., if there's only 1 right answer, lower the temperature (randomness) and top_p (vocab)
    - (even more tips for specific use cases within text completion. and yet even more tips elsewhere in the docs, beyond this page.)
  - https://platform.openai.com/docs/guides/safety-best-practices
    - Moderation API: check if `input` is `flagged` https://platform.openai.com/docs/guides/moderation
    - practice "red-teaming" with representative examples but also seek out blind spots (off-topic? ignoring instructions?)
    - some ways to reduce risk: requiring login or linking to an existing trusted email provider, or requiring a credit card
    - constrain input length and constrain output length
    - constrain input values with a `<select>` dropdown
    - constrain output values with a list of reference documents, instead of answering from scratch
    - HITL = Human In The Loop. human reviewers.
    - let users report issues
    - communicate limitations to calibrate expectations
    - consider hashed end-user IDs to help when misuse is detected: https://platform.openai.com/docs/guides/safety-best-practices/end-user-ids
  - https://platform.openai.com/docs/guides/production-best-practices

- **_explore examples?_**
  - remember: you can even ask the model to generate prompts!
  - https://learnprompting.org/docs/category/-applied-prompting
    - like using the LLM to generate better prompts to put back into the LLM!
    - or using the LLM to ask clarifying questions to clarify ambiguity, as long as you provide the right knowledge-base text. But note that it might generate false information if it's not in the provided knowledge-base text, or if the user prompt is still too ambiguous.
    - or using GPT-3 to reduce the number of intents in a chatbot to broader categories for context (think: dropdown) for the exact user question and use [semantic search](https://en.wikipedia.org/wiki/Semantic_search) to narrow down the knowledge-base text to add to the user question (and relevant last few messages between the user and chatbot as context). But note that it might generate false information if it's not in the provided knowledge-base text, or if the user prompt is still too ambiguous.
    - or interleave code with natural language to calculate answers: https://nbviewer.org/github/trigaten/Learn_Prompting/blob/main/docs/code_examples/PAL.ipynb
  - https://huggingface.co/datasets/fka/awesome-chatgpt-prompts (click to expand)
  - https://www.reddit.com/r/PromptDesign
  - https://discord.gg/7enStJXQzD
- more: https://learnprompting.org/docs/additional
  - 8 tips for writing better prompts: https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-openai-api
    - e.g.: `Summarize the text below and (...) {text}` --> `Summarize the text below and (...) Text: """{text}"""`
    - e.g.: add a "leading word" or start the first word to nudge the model's response towards a specific pattern: `Write code in Python to do (...):` --> `Write code in Python to do (...): import`
    - model, temperature, max_tokens, stop
- udemy:
  - https://www.udemy.com/course/promptengineering:
    - consider _**accuracy, relevance, and usefulness**_. For example, simply asking for a summary or list of exercise tips might be okay, but if your client actually wants specific aerobic exercises to help treat a specific condition or has a specific goal in mind or expect certain things in the summary (like numbers or sources or types of tips, etc.), then including that in the prompt will help increase relevance/usefulness to the user. Be specific! <-- task, context, wording, format. (wording: vocabulary appropriate to the field but also to set the tone for the expected output given to the target audience)
    - consider breaking down a large complex essay task in-one-go into easier intro/discussion/conclusion sections as tasks instead. Use counterfactual thinking to help think of how to de-bias your prompts.
    - consider telling the LLM to intentionally leave out information, like if you want it to interact like a Question-and-Answer conversation and only ask questions and not generate both sides of the conversation, e.g. `teach me (...), including a quiz at the end, but don't give me the answers and then tell me if I got the answer right when I respond.`
    - consider setting up regular checks on bias and privacy, and be transparent on how the model is trained and to manage expectations.
    - consider subscribing to blogs/leaders in Prompt Engineering to update/learn/collaborate/network
  - https://www.udemy.com/course/chatgpt-prompt-engineering:
    - a _**well-engineered prompt = instructions + (examples) + request**_
      - instructions:
        - `"Act as ..."`
        - `"You know ..."`, `"You have been ..."`, `"You will ..."`
        - `"Your goal is to ..."`
        - `"You are (...characteristics...)"` (behaviour)
        - `"You will ..."`, `"I will ..."` (interaction)
      - examples:
        - (see other notes)
      - request:
        - `"My first request is ..."`
    - prompt with end completion
    - prompt with middle completion `"[insert]"`
    - prompt with list continuation
    - prompt with style modifiers
- OpenAI/DeepLearning.AI course notes and **example prompt template** (WIP): https://github.com/hchiam/learning-prompt-eng/blob/main/open_ai_course_notes.md#example-prompt-template-wip
- https://trydyno.com = playground
- https://dust.tt/ = make LLM apps
