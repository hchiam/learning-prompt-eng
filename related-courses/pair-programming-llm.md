# https://learn.deeplearning.ai/pair-programming-llm

_**REMINDER:**_ output -> read, understand, try, test cases BEFORE using in production. 

## getting started

Get an API key at [developers.generativeai.google](https://developers.generativeai.google/), then do the following:

```sh
!pip install -q google.generativeai # -q is for quiet
```

```py
import os
import google.generativeai as palm
from google.api_core import client_options as client_options_lib

palm.configure(
    api_key=get_api_key(),
    transport="rest",
    client_options=client_options_lib.ClientOptions(
        api_endpoint=os.getenv("GOOGLE_API_BASE"),
    )
)

# get the model we want to use:

for m in palm.list_models():
    print(f"name: {m.name}") # bigger animal typically is bigger model
    print(f"description: {m.description}")
    print(f"generation methods:{m.supported_generation_methods}\n")

models = [m for m in palm.list_models() 
          if 'generateText' 
          in m.supported_generation_methods]

print(models) # chat-bison for chat, text-bison for one go generating text

model_bison = models[0]

print(model_bison) # to make sure getting the right one

from google.api_core import retry

@retry.Retry()
def generate_text(prompt,
                  model=model_bison,
                  temperature=0.0):
    return palm.generate_text(prompt=prompt,
                              model=model,
                              temperature=temperature)

# use the model:

prompt = "Show me how to iterate across a list in Python." # "show me" should make it explain as it writes code
completion = generate_text(prompt)
print(completion.result)

# _**REMINDER:**_ output -> read, understand, try, test cases BEFORE using in production. 
```

## use a string template to quickly edit just the primer/question/decorator part of the prompt

```py
import os
from utils import get_api_key
import google.generativeai as palm
from google.api_core import client_options as client_options_lib

palm.configure(
    api_key=get_api_key(),
    transport="rest",
    client_options=client_options_lib.ClientOptions(
        api_endpoint=os.getenv("GOOGLE_API_BASE"),
    )
)

# get the model we want to use:

models = [m for m in palm.list_models() if 'generateText' in m.supported_generation_methods]
model_bison = models[0]
model_bison

from google.api_core import retry
@retry.Retry()
def generate_text(prompt, 
                  model=model_bison, 
                  temperature=0.0):
    return palm.generate_text(prompt=prompt,
                              model=model,
                              temperature=temperature)

# set up the prompt

prompt_template = """
{priming}

{question}

{decorator}

Your solution:
"""

priming_text = "You are an expert at writing clear, concise, Python code."

question = "create a doubly linked list"

decorator = "Insert comments for each line of code." # more explicit than: decorator = "Work through it step by step, and show your work. One step per line."

prompt = prompt_template.format(priming=priming_text,
                                question=question,
                                decorator=decorator)
print(prompt)

# use the model:
completion = generate_text(prompt)
print(completion.result)

# _**REMINDER:**_ output -> read, understand, try, test cases BEFORE using in production. 
```

## pair programming scenarios

- improve existing code [I in AEIOU](https://github.com/hchiam/learning-interviews#:~:text=AEIOU)
- simplify code [I in AEIOU](https://github.com/hchiam/learning-interviews#:~:text=AEIOU)
- write test cases for code [U in AEIOU](https://github.com/hchiam/learning-interviews#:~:text=AEIOU)
- make code more efficient [O in AEIOU](https://github.com/hchiam/learning-interviews#:~:text=AEIOU)
- debug code

```py
import os
from utils import get_api_key
import google.generativeai as palm
from google.api_core import client_options as client_options_lib

palm.configure(
    api_key=get_api_key(),
    transport="rest",
    client_options=client_options_lib.ClientOptions(
        api_endpoint=os.getenv("GOOGLE_API_BASE"),
    )
)

from google.api_core import retry
@retry.Retry()
def generate_text(prompt, 
                  model=model_bison, 
                  temperature=0.0):
    return palm.generate_text(prompt=prompt,
                              model=model,
                              temperature=temperature)

# choose model

models = [m for m in palm.list_models() if 'generateText' in m.supported_generation_methods]
model_bison = models[0]
model_bison

# set up prompt

prompt_template = """
I don't think this code is the best way to do it in Python, can you help me?

{question}

Please explain, in detail, what you did to improve it.
"""
# or: Please explore multiple ways of solving the problem, and explain each.
# or: Please explore multiple ways of solving the problem, and tell me which is the most Pythonic.

# prompt_template = """
# Can you please simplify this code for a linked list in Python?
# You are an expert in Pythonic code.
# 
# {question}
#
# Please comment each line in detail, 
# and explain in detail what you did to modify it, and why.
# """

# prompt_template = """
# Can you please create test cases in code for this Python code?
# 
# {question}
# 
# Explain in detail what these test cases are designed to achieve.
# """

# prompt_template = """
# Can you please make this code more efficient?
# 
# {question}
# 
# Explain in detail what you changed and why.
# """

# prompt_template = """
# Can you please help me to debug this code?
# 
# {question}
# 
# Explain in detail what you found and why it was a bug.
# """

question = """
def func_x(array)
  for i in range(len(array)):
    print(array[i])
"""

# use model

completion = generate_text(
    prompt = prompt_template.format(question=question)
)
print(completion.result)

# _**REMINDER:**_ output -> read, understand, try, test cases BEFORE using in production. 
```
