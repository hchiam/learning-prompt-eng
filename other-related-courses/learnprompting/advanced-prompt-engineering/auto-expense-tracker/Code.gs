/** @OnlyCurrentDoc */
// the comment above is special: it limits access to only this doc (instead of all of a user's docs)

function onOpen() {
  SpreadsheetApp.getUi().createMenu('Expense Tracker')
      .addItem('Track Expenses', 'showExpensePopup')
      .addToUi();
}

function showExpensePopup() {
  var html = HtmlService.createHtmlOutputFromFile('ExpenseForm')
      .setWidth(300)
      .setHeight(200);
  SpreadsheetApp.getUi().showModalDialog(html, 'Enter Expense');
}

function addExpense(category, amount) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.appendRow([new Date(), category, amount]);
}

function getUniqueCategories() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var categories = sheet.getRange('B2:B').getValues().flat(); // I had to manually edit B:B to B2:B to ignore column headers
  return Array.from(new Set(categories));
}

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

function generatePieChart() {
  var categorizedExpenses = categorizeExpenses();
  var data = [];
  
  for (var category in categorizedExpenses) {
    data.push([category, categorizedExpenses[category]]);
  }

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var chart = sheet.newChart()
    .setChartType(Charts.ChartType.PIE)
    .addRange(sheet.getRange(1, 2, data.length, 2)) // I had to manually fix the 2nd param (column number = 2)
    .setPosition(5, sheet.getLastColumn() + 2, 0, 0)
    .build();
  
  sheet.insertChart(chart);
}

// I had to manually edit this, since the "On Form Submit" trigger only works when a google form submits a response to a google sheet, not for a popup submit in the sheet
function onFormSubmit(category, amount) {
  addExpense(category, amount);
  generatePieChart();
}
