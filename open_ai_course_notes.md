# OpenAI/DeepLearning.AI Course Notes

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
- instead of "summarize", try "extract information relevant to (target audience)", and include a reference to the original text
- instead of just "what's the sentiment", try "list out the emotions of" and "is the writer expressing (specific feeling important to client success department) on a scale" and other information in one prompt
  - much faster than training a bunch of specializied NLP models with traditional ML!

## Example prompt template (WIP)

My summary of what I've learned: (consider checking the notes above and also the notes at https://github.com/hchiam/learning-prompt-eng/blob/main/README.md)

```text
As a (role), your goal/task is to

Write a (in what way) / tone

It is for (target audience) / context

Include at the end

Format it as (HTML, or JSON with keys named, or delimited by triple backticks,
and give examples if needed for your app)

Check the input (and fallback if needed for your app)

(lay out any helpful steps for the model to do to help itself think)

INPUT:
---
{input}
---

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
  """
  returns just one response for one prompt
  """
  messages = [{ 'role':'user', 'content':prompt }]
  response = openai.ChatCompletion.create(
    model=model,
    messages=messages,
    temperature=0, # 0 means no output randomness expected
  )
  return response.choices[0].message['content']

def get_completion_from_messages(messages, model='gpt-3.5-turbo', temperature=0):
  """
  To act like a chatbot with a list of messages.
  Make sure to send and initial message {'role':'system', 'content':'You are an assistant that...'} to guide the chatbot without this content being part of the actual conversation.
  Then {'role':'user','content':'...'}, {'role':'assistant','content':'...'}, ...
  """
  response = openai.ChatCompletion.create(
    model=model,
    messages=messages,
    temperature=temperature,
  )
  print(str(response.choices[0].message))
  return response.choices[0].message['content']

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

```py
from IPython.display import display, Markdown, Latex, HTML, JSON
from redlines import Redlines

display(HTML(response))

diff = Redlines(text, response)
display(Markdown(diff.output_markdown))
```
