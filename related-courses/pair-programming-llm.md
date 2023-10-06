# https://learn.deeplearning.ai/pair-programming-llm

## 1

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

prompt = "Show me how to iterate across a list in Python." # "show me" should make it explain as it writes code
completion = generate_text(prompt)
print(completion.result)
# output -> read, understand, try, test BEFORE using in production
```

## 2
