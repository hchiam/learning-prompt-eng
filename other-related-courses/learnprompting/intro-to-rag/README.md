# Introduction to RAG

Example: 

![RAG example](https://github.com/hchiam/learning-prompt-eng/blob/main/other-related-courses/learnprompting/intro-to-rag/RAG-example.png)

## 1 of 8: query generation prompt: 
user input: 
- are mavis 600 or mavis 2000 badminton birdies cheaper right now? 

agent generates queries: 
- what searches do you need to perform to answer the above question? 

## 2 of 8: Gen AI

## 3 of 8: queries output: 
1. how much is a tube of 6 mavis 600 badminton birdies right now? 
2. how much is a tube of 6 mavis 2000 badminton birdies right now? 

## 4 of 8: DB

## 5 of 8: queries results output: 
1. $34.78 for a tube of 6 mavis 600 badminton birdies 
2. $25.99 for a tube of 6 mavis 2000 badminton birdies

## 6 of 8: final prompt:
queries results output: 
1. $34.78 for a tube of 6 mavis 600 badminton birdies 
2. $25.99 for a tube of 6 mavis 2000 badminton birdies 

user input: 
- are mavis 600 or mavis 2000 badminton birdies cheaper right now? 

## 7 of 8: Gen AI

## 8 of 8: final output: 
mavis 2000 badminton birdies are cheaper right now. 

# Vector Databases with RAG

## 1 of 7: 
1. user input
2. documentation pages

## 2 of 7: 
1. user input --> embedding
2. documentation pages --> embedding

## 3 of 7: 
comparison model (user input embedding vs documentation pages embedding)

## 4 of 7: 
most relevant document(s)

## 5 of 7: 
most relevant document(s)

user input

## 6 of 7: 
Gen AI (combines most relevant document(s) and user input)

## 7 of 7: 
output

## example vector DB for RAG in colab code:

https://docs.llamaindex.ai/en/stable/getting_started/starter_example/

Create /data/[paul_graham_essay.txt](https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/paul_graham/paul_graham_essay.txt)

```sh
# for colab:
!pip install llama-index
```

```py
# for colab:
import os
from google.colab import userdata
os.environ["OPENAI_API_KEY"] = userdata.get('OPENAI_API_KEY')
```

```py
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader

documents = SimpleDirectoryReader("data").load_data()
index = VectorStoreIndex.from_documents(documents)
```

```py
query_engine = index.as_query_engine()
response = query_engine.query("What did the author do growing up?")
print(response)
# The author focused on writing short stories and programming, starting with early attempts on an IBM 1401 using Fortran in 9th grade, and later transitioning to microcomputers like the TRS-80 to write games, rocket prediction programs, and a word processor.
```

```py
# extras: 
# Viewing Queries and Events Using Logging
# Storing your index
# Loading your index

https://docs.llamaindex.ai/en/stable/getting_started/starter_example/
```
