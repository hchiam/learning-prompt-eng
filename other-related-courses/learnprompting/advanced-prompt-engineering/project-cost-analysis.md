# project cost analysis with different methods

You might find this file easier to read on GitHub: https://github.com/hchiam/learning-prompt-eng/blob/main/other-related-courses/learnprompting/advanced-prompt-engineering/project-cost-analysis.md

The tricky part of the data provided is the last bullet point.

Based on re-running each of the following in separate chats with ChatGPT 3.5, it seems SA worked the most consistently, and when it didn't get the exact answer, it at least returned a number closer to what I expected the answer to be. With this as the rough criteria, SA surprisingly performed better than CCoT (I tried using `<non-example>` and `<incorrect-example>` and `# INCORRECT example:`) - maybe the incorrect example confused the LLM. Most of the strategies other than SA usually didn't give the correct answer, returning much smaller numbers.

## CoT

<details>
<summary>click to expand</summary>

```
Scenario: 
You are an engineer estimating the cost of materials for a small building project.

Objective: 
Calculate the total estimated cost for a construction project.

Data Provided: 
- Lumber costs $15 per foot.
- You need 200 feet of lumber.
- Nails cost $5 per box.
- You need 10 boxes of nails per 100 feet of lumber.
- Labor costs are $50 per hour.
- Estimated labor time is 40 hours unless you use more than 10 boxes of nails, in which case they will be equal to the number of feet of lumber plus the cost of all boxes of nails.

Be careful with the units and make sure to check if further intermediate calculations are necessary. Let's think step-by-step:
```

</details>

## ThoT

<details>
<summary>click to expand</summary>

```
Scenario: 
You are an engineer estimating the cost of materials for a small building project.

Objective: 
Calculate the total estimated cost for a construction project.

Data Provided: 
- Lumber costs $15 per foot.
- You need 200 feet of lumber.
- Nails cost $5 per box.
- You need 10 boxes of nails per 100 feet of lumber.
- Labor costs are $50 per hour.
- Estimated labor time is 40 hours unless you use more than 10 boxes of nails, in which case they will be equal to the number of feet of lumber plus the cost of all boxes of nails.

Be careful with units. Walk me through this context in manageable parts step by step, summarizing and analyzing as we go:
```

</details>

## SA

<details>
<summary>click to expand</summary>

```
<example>
What is the total estimated cost for the small volunteer project?
- Planks cost $5 per meter.
- You need 30 meters of planks.
- Nails cost $1 per box.
- You need 1 boxes of nails per 10 meter of planks.
- Labor costs are $20 per hour.
- Estimated labor time is 20 hours unless you use more than 1 box of nails, in which case they will be equal to the number of meters of planks plus the cost of all boxes of nails.

Are follow-up questions needed here?
Yes

Follow-up question:
What is the formula for the overall cost?

Intermediate answer:
Total estimated cost = planks cost + nails cost + labor cost.

Follow-up question:
We know how much planks cost per meter, but how much will all the planks we need cost?

Intermediate answer:
We need 30 meters of planks, and planks cost $5 per meter, so:
Planks cost = $5 / m * 30 m = $5 / 1m * 30m = $5 * 30 m / 1 m = $5 * 30 = $150
So the total cost of the planks will be $150.

Follow-up question:
How much will all the required nails cost?

Intermediate answer:
Nails cost = ($1 / box) * (1 box / 10 m) * 30 m = ($1 / 1 box) * (1 box / 10 m) * 30 m = $1 / 10 m * 30 m = $1 * (30 m / 10 m) = $1 * (30/10) = $1 * 3 = $3
So $3 is the total cost of all the nails we'll need.

Follow-up question:
What is the labor cost?

Intermediate answer:
Labor cost is $20 per hour, but we don't have the number of hours calculated yet.

Follow-up question:
What do we need to calculate the labor cost?

Intermediate answer:
Labor cost is $20 per hour, so we need to calculate the number of hours of labor.

Follow-up question:
What are the number of labor hours?

Intermediate answer:
Labor hours is related to the number of boxes of nails, so we need to calculate that first: 
Boxes of nails required = (1 box of nails / 10 m of planks) * (30 m of planks) = 3 boxes of nails.
Since 3 boxes of nails > 1 box of nails, we use a different formula for labor hours: 
Labor hours = meters of planks + nails cost = 30 + 3 = 33 hours.
It is a little bit of a weird formula, but at least now we have labor hours in hours units.

Follow-up question:
What is the labor cost?

Intermediate answer:
Since labor hours is 33 hours, we can now calculate the labor cost:
Labor cost = $20 / hour * 33 hours = ($20 * 33 / 1) = $660.

So the final answer is:
Total estimated cost = planks cost + nails cost + labor cost = $150 + $3 + $660 = $813.
$813.
</example>

What is the total estimated cost for the construction project?
- Lumber costs $15 per foot.
- You need 200 feet of lumber.
- Nails cost $5 per box.
- You need 10 boxes of nails per 100 feet of lumber.
- Labor costs are $50 per hour.
- Estimated labor time is 40 hours unless you use more than 10 boxes of nails, in which case they will be equal to the number of feet of lumber plus the cost of all boxes of nails.

Are follow-up questions needed here?
```

</details>

## CCoT (Contrastive CoT)

<details>
<summary>click to expand</summary>

```
# CORRECT example:

What is the total estimated cost for the small volunteer project?
- Planks cost $5 per meter.
- You need 30 meters of planks.
- Nails cost $1 per box.
- You need 1 boxes of nails per 10 meter of planks.
- Labor costs are $20 per hour.
- Estimated labor time is 20 hours unless you use more than 1 box of nails, in which case they will be equal to the number of meters of planks plus the cost of all boxes of nails.

Are follow-up questions needed here?
Yes

Follow-up question:
What is the formula for the overall cost?

Intermediate answer:
Total estimated cost = planks cost + nails cost + labor cost.

Follow-up question:
We know how much planks cost per meter, but how much will all the planks we need cost?

Intermediate answer:
We need 30 meters of planks, and planks cost $5 per meter, so:
Planks cost = $5 / m * 30 m = $5 / 1m * 30m = $5 * 30 m / 1 m = $5 * 30 = $150
So the total cost of the planks will be $150.

Follow-up question:
How much will all the required nails cost?

Intermediate answer:
Nails cost = ($1 / box) * (1 box / 10 m) * 30 m = ($1 / 1 box) * (1 box / 10 m) * 30 m = $1 / 10 m * 30 m = $1 * (30 m / 10 m) = $1 * (30/10) = $1 * 3 = $3
So $3 is the total cost of all the nails we'll need.

Follow-up question:
What is the labor cost?

Intermediate answer:
Labor cost is $20 per hour, but we don't have the number of hours calculated yet.

Follow-up question:
What do we need to calculate the labor cost?

Intermediate answer:
Labor cost is $20 per hour, so we need to calculate the number of hours of labor.

Follow-up question:
What are the number of labor hours?

Intermediate answer:
Labor hours is related to the number of boxes of nails, so we need to calculate that first: 
Boxes of nails required = (1 box of nails / 10 m of planks) * (30 m of planks) = 3 boxes of nails.
Since 3 boxes of nails > 1 box of nails, we use a different formula for labor hours: 
Labor hours = meters of planks + nails cost = 30 + 3 = 33 hours.
It is a little bit of a weird formula, but at least now we have labor hours in hours units.

Follow-up question:
What is the labor cost?

Intermediate answer:
Since labor hours is 33 hours, we can now calculate the labor cost:
Labor cost = $20 / hour * 33 hours = ($20 * 33 / 1) = $660.

So the final answer is:
Total estimated cost = planks cost + nails cost + labor cost = $150 + $3 + $660 = $813.
$813.



# INCORRECT example:

What is the total estimated cost for the small volunteer project?
- Planks cost $5 per meter.
- You need 30 meters of planks.
- Nails cost $1 per box.
- You need 1 boxes of nails per 10 meter of planks.
- Labor costs are $20 per hour.
- Estimated labor time is 20 hours unless you use more than 1 box of nails, in which case they will be equal to the number of meters of planks plus the cost of all boxes of nails.

Are follow-up questions needed here?
Yes

Follow-up question:
What is the formula for the overall cost?

Intermediate answer:
Total estimated cost = planks cost + nails cost + labor cost.

Follow-up question:
We know how much planks cost per meter, but how much will all the planks we need cost?

Intermediate answer:
We need 30 meters of planks, and planks cost $5 per meter, so:
Planks cost = $5 / m * 30 m = $5 / 1m * 30m = $5 * 30 m / 1 m = $5 * 30 = $150
So the total cost of the planks will be $150.

Follow-up question:
How much will all the required nails cost?

Intermediate answer:
Nails cost = ($1 / box) * (1 box / 10 m) * 30 m = ($1 / 1 box) * (1 box / 10 m) * 30 m = $1 / 10 m * 30 m = $1 * (30 m / 10 m) = $1 * (30/10) = $1 * 3 = $3
So $3 is the total cost of all the nails we'll need.

Follow-up question:
What is the labor cost?

Intermediate answer:
Labor hours is related to the number of boxes of nails, so we need to calculate that first: 
Boxes of nails required = (1 box of nails / 10 m of planks) * (30 m of planks) = 3 boxes of nails.
Since 3 boxes of nails > 1 box of nails, we use a different formula for labor hours: 
Labor cost = meters of planks + nails cost = 30 + 3 = $33.

So the final answer is:
Total estimated cost = planks cost + nails cost + labor cost = $150 + $3 + $33 = $186.
$186.



# Now your turn:

What is the total estimated cost for the construction project?
- Lumber costs $15 per foot.
- You need 200 feet of lumber.
- Nails cost $5 per box.
- You need 10 boxes of nails per 100 feet of lumber.
- Labor costs are $50 per hour.
- Estimated labor time is 40 hours unless you use more than 10 boxes of nails, in which case they will be equal to the number of feet of lumber plus the cost of all boxes of nails.

Are follow-up questions needed here?
```

</details>

## Tab-CoT WITH question marks

<details>
<summary>click to expand</summary>

```
<example>
What is the total estimated cost for the small volunteer project?
- Planks cost $5 per meter.
- You need 30 meters of planks.
- Nails cost $1 per box.
- You need 1 boxes of nails per 10 meter of planks.
- Labor costs are $20 per hour.
- Estimated labor time is 20 hours unless you use more than 1 box of nails, in which case they will be equal to the number of meters of planks plus the cost of all boxes of nails.

|step|subquestion|procedure|result|
|1|what is total cost?|total overall = planks cost + nails cost + labor cost|$?|
|2|what is planks cost?|total planks cost = $5/m * 30 m = $5 * (30 m / 1 m) = $150|$150|
|3|what is nails cost?|total nails cost = ($1 / box) * (1 box / 10 m) * 30 m = ($1 / 1 box) * (1 box / 10 m) * 30 m = $1 / 10 m * 30 m = $1 * (30 m / 10 m) = $1 * (30/10) = $1 * 3 = $3|$3|
|4|what is labor cost?|total labor cost = $20/hour * labor hours|$?|
|5|what is labor hours?|total labor hours = 20 hours but if boxes of nails > 1 then meters of planks + nails cost|? hours|
|6|what is boxes of nails?|total boxes of nails = 1 box of nails / 10 m * 30 m = 1 box * 30m/10m = 1 * 3 = 3 boxes|3 boxes|
|7|what is labor hours?|since boxes of nails is 3 which is > 1 then total labor hours = 30 meters of planks + $3 nails cost = 30 + 3 = 33 hours|33 hours|
|8|what is labor cost?|total labor cost = $20/hour * labor hours = $20 / 1 hour * 33 hours = $20 * (33 hours / 1 hour) = $20 * 33/1 = $20 * 33 = $660|$660|
|9|what is total cost?|total overall = planks cost + nails cost + labor cost = $150 + $3 + $660 = $813|$813|

Final answer: the total estimated cost for the small volunteer project is $813.
</example>

What is the total estimated cost for the construction project?
- Lumber costs $15 per foot.
- You need 200 feet of lumber.
- Nails cost $5 per box.
- You need 10 boxes of nails per 100 feet of lumber.
- Labor costs are $50 per hour.
- Estimated labor time is 40 hours unless you use more than 10 boxes of nails, in which case they will be equal to the number of feet of lumber plus the cost of all boxes of nails.

|step|subquestion|procedure|result|
```

</details>

## Tab-CoT withOUT question marks

This seemed to work more often than the previous version WITH question marks does.

<details>
<summary>click to expand</summary>

```
<example>
What is the total estimated cost for the small volunteer project?
- Planks cost $5 per meter.
- You need 30 meters of planks.
- Nails cost $1 per box.
- You need 1 boxes of nails per 10 meter of planks.
- Labor costs are $20 per hour.
- Estimated labor time is 20 hours unless you use more than 1 box of nails, in which case they will be equal to the number of meters of planks plus the cost of all boxes of nails.

Calculation table:

|step|subquestion|procedure|result|
|1|what is planks cost?|total planks cost = $5/m * 30 m = $5 * (30 m / 1 m) = $150|$150|
|2|what is nails cost?|total nails cost = ($1 / box) * (1 box / 10 m) * 30 m = ($1 / 1 box) * (1 box / 10 m) * 30 m = $1 / 10 m * 30 m = $1 * (30 m / 10 m) = $1 * (30/10) = $1 * 3 = $3|$3|
|3|what is boxes of nails?|total boxes of nails = 1 box of nails / 10 m * 30 m = 1 box * 30m/10m = 1 * 3 = 3 boxes|3 boxes|
|4|what is labor hours?|boxes of nails is 3 which is > 1, so total labor hours = 30 meters of planks + $3 nails cost = 30 + 3 = 33 hours|33 hours|
|5|what is labor cost?|total labor cost = $20/hour * labor hours = $20 / 1 hour * 33 hours = $20 * (33 hours / 1 hour) = $20 * 33/1 = $20 * 33 = $660|$660|
|6|what is total cost?|total overall = planks cost + nails cost + labor cost = $150 + $3 + $660 = $813|$813|

Final answer: the total estimated cost for the small volunteer project is $813.
</example>

What is the total estimated cost for the construction project?
- Lumber costs $15 per foot.
- You need 200 feet of lumber.
- Nails cost $5 per box.
- You need 10 boxes of nails per 100 feet of lumber.
- Labor costs are $50 per hour.
- Estimated labor time is 40 hours unless you use more than 10 boxes of nails, in which case they will be equal to the number of feet of lumber plus the cost of all boxes of nails.

Calculation table:
```

</details>
