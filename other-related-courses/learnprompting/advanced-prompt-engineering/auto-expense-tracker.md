# Automated Expense Tracker

(Note: this may not be a pure example of PoTh, since I'm explicitly suggesting some of the steps, but I do guide the model to insert what else it thinks are necessary that I may not have thought of.)

## Prompt

You are a senior software developer that writes clean, efficient, concise, readable code. You are tasked with creating a short, simple program to automatically track and categorize personal expenses. The code will be written in google apps script associated with a google sheet. Break down the project into coding subtasks such as showing a popup to the user, generating categories, categorizing expenses, generate or update a pie graph of categories, etc., but also think of anything else that's needed in between, before, or after. Write code segments for each subtask.

## Response

Sure, here's a breakdown of the project into coding subtasks along with code segments for each:

1. **Setting up the Google Apps Script project**:
   - Create a new Google Apps Script project attached to the Google Sheet.
   
```javascript
// This code goes into the Google Apps Script project
function onOpen() {
  SpreadsheetApp.getUi().createMenu('Expense Tracker')
      .addItem('Track Expenses', 'showExpensePopup')
      .addToUi();
}
```

2. **Showing a popup to the user**:
   - Create a dialog box to input expenses.
   
```javascript
function showExpensePopup() {
  var html = HtmlService.createHtmlOutputFromFile('ExpenseForm')
      .setWidth(300)
      .setHeight(200);
  SpreadsheetApp.getUi().showModalDialog(html, 'Enter Expense');
}
```

3. **Creating an HTML form for expense input**:
   - Create an HTML file for the form.
   
```html
<!-- ExpenseForm.html -->
<!DOCTYPE html>
<html>
  <head>
    <base target="_top">
  </head>
  <body>
    <form>
      <label for="category">Category:</label>
      <input type="text" id="category" name="category"><br><br>
      <label for="amount">Amount:</label>
      <input type="number" id="amount" name="amount"><br><br>
      <input type="button" value="Submit" onclick="submitForm()">
    </form>
    <script>
      function submitForm() {
        var category = document.getElementById("category").value;
        var amount = document.getElementById("amount").value;
        google.script.run.addExpense(category, amount);
        google.script.host.close();
      }
    </script>
  </body>
</html>
```

4. **Adding expenses to the Google Sheet**:
   - Write a function to add expenses to the sheet.

```javascript
function addExpense(category, amount) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.appendRow([new Date(), category, amount]);
}
```

5. **Generating categories**:
   - Retrieve unique categories from the expense data.

```javascript
function getUniqueCategories() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var categories = sheet.getRange('B:B').getValues().flat();
  return Array.from(new Set(categories));
}
```

6. **Categorizing expenses**:
   - Group expenses by category.

```javascript
function categorizeExpenses() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var expenses = sheet.getRange('B2:C' + sheet.getLastRow()).getValues();
  var categories = getUniqueCategories();
  var categorizedExpenses = {};
  
  categories.forEach(function(category) {
    categorizedExpenses[category] = 0;
  });
  
  expenses.forEach(function(expense) {
    categorizedExpenses[expense[0]] += expense[1];
  });
  
  return categorizedExpenses;
}
```

7. **Generating or updating a pie graph of categories**:
   - Generate or update a pie chart based on categorized expenses.

```javascript
function generatePieChart() {
  var categorizedExpenses = categorizeExpenses();
  var data = [];
  
  for (var category in categorizedExpenses) {
    data.push([category, categorizedExpenses[category]]);
  }
  
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var chart = sheet.newChart()
    .setChartType(Charts.ChartType.PIE)
    .addRange(sheet.getRange(1, 1, data.length, 2))
    .setPosition(5, sheet.getLastColumn() + 2, 0, 0)
    .build();
  
  sheet.insertChart(chart);
}
```

8. **Finalizing the code**:
   - Ensure proper execution of functions when needed.

```javascript
// Trigger function to run on form submission
function onFormSubmit(e) {
  addExpense(e.namedValues.category, e.namedValues.amount);
  generatePieChart();
}
```

Remember to enable the necessary Google Apps Script APIs and set up triggers as needed for the functions to execute properly. Also, customize the code according to your specific requirements and preferences.
