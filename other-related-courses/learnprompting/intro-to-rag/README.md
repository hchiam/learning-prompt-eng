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
