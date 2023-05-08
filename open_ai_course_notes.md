# OpenAi/DeepLearning.AI Course Notes

## ChatGPT Prompt Engineering for Developers

https://learn.deeplearning.ai/chatgpt-prompt-eng/

- give **clear** (!= short) and **specific** instructions
  - use **delimiters** character sequences to section off text and also avoid prompt injection (don't forget to sanitize delimiters from input)
  - tell the model to output in specific structured **format**, e.g. JSON with specific keys
  - tell the model to **check input** meets assumed conditions, and provide **fallback** output
  - give successful **examples** of the task (one-shot / few-shot)
- give the model **time to think**
  - **list out steps** for the model to do that lead to the final output you want (tip: **structure the output per step** too! "Use the following format:")
  - tell the model to **work out its own solution** first **before evaluating** or **before jumping to a conclusion**
- model limitations
  - hallucinations: plausible but untrue statements (it hasn't perfectly memorized and doesn't know its own limitations)
    - tell the model to first find relevant quotes, then answer the question based on the quotes = way to trace information
- **iterate** (>> perfect first try): **think** --> **make** --> **test** --> think --> ...
  - to improve and polish towards your specific use case
  - when your **app matures**, have your prompt **tested against many example test cases**

## Example prompt template

```text
Your goal/task is to

Write a

It is for

Include at the end

Format it as (with delimited examples if needed for your app)

Check the input (and fallback if needed for your app)

(lay out any helpful steps for the model to do to help itself think)

(start the expected output to autocomplete)
```

## Notebook/Colab Python code

```sh
pip install openai
```

```py
import openai
openai.api_key = 'sk-...'

def get_completion(prompt, model='gpt-3.5-turbo'):
  messages = [{ 'role':'user', 'content':prompt }]
  response = openai.ChatCompletion.create(
    model=model,
    messages=messages,
    temperature=0, # output randomness
  )
  return response.choices[0].message["content"]

text = f"""
...
"""

prompt_1 = f"""
...

Text:
```{text}```
"""

response = get_completion(prompt)
print("Completion for prompt:")
print(response)
```
