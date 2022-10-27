//////////////////////////////////////////////////////////////////
// Returns the number of days in a month
// month is in the range [0..11]
//////////////////////////////////////////////////////////////////
function getDaysInMonth(year, month) {
  // +1 added to month because .getDate() returns the number of
  // days in the previous when day is set to 0
  return new Date(year, month + 1, 0).getDate();
}

//////////////////////////////////////////////////////////////////
// Returns the ordinal suffix of a number
// n can be any number
//////////////////////////////////////////////////////////////////
function getOrdinal(n) {
  let ord = 'th';

  if (n % 10 == 1 && n % 100 != 11) {
    ord = 'st';
  } else if (n % 10 == 2 && n % 100 != 12) {
    ord = 'nd';
  } else if (n % 10 == 3 && n % 100 != 13) {
    ord = 'rd';
  }
  return ord;
}


//////////////////////////////////////////////////////////////////
// Set Caption for timesheet
//////////////////////////////////////////////////////////////////
function setCaption() {
  const captionEl = document.querySelector(".timesheet-caption");

  timesheetMonth = date.getMonth();
  timesheetYear = date.getFullYear();

  // get the month name
  const monthName = date.toLocaleString('default', { month: 'long' });
  
  // Set Timesheet's caption
  if (date.getDate() <= 15) {
    captionEl.textContent = monthName + " 1 - 15, " + timesheetYear;
  } else {
    captionEl.textContent = monthName + " 16 - " + getDaysInMonth(timesheetYear, timesheetMonth) + ", " + timesheetYear;
  }
}

//////////////////////////////////////////////////////////////////
// Set Timesheet Body
//////////////////////////////////////////////////////////////////
function setTimesheetBody() {
  const timesheetBodyEl = document.querySelector(".timesheet-body");

  timesheetBodyEl.textContent = "";
  timesheetYear = date.getFullYear();
  timesheetMonth = date.getMonth();
  daysInTimesheetMonth = getDaysInMonth(timesheetYear, timesheetMonth);

  // set a temporary date that will change in the loop
  let tempDate = new Date(date);
  let endDay = daysInTimesheetMonth;
  
  if (tempDate.getDate() <= 15) {
    tempDate.setDate(1);
    endDay = 15;
  } else {
    tempDate.setDate(16);
    endDay = daysInTimesheetMonth;
  }
  
  console.log(tempDate);
  console.log(endDay);


  // Create rows for timesheet table
  for (let i = tempDate.getDate(); i <= endDay; i++) {
    tempDate.setDate(i);
    // Table row
    const tr = document.createElement("tr");
    
    // Data cell for date
    const tdDate = document.createElement("td");
    tdDate.textContent = i + getOrdinal(i);
    
    // Data cell for day
    const tdDay = document.createElement("td");
    tdDay.textContent = tempDate.toLocaleDateString('en-us', { weekday: 'short' });

    // Append data cells to table row
    tr.appendChild(tdDate);
    tr.appendChild(tdDay);
    tr.appendChild(document.createElement("td"));
    tr.appendChild(document.createElement("td"));
    tr.appendChild(document.createElement("td"));
    tr.appendChild(document.createElement("td"));
    tr.appendChild(document.createElement("td"));

    // Append table row to table body
    timesheetBodyEl.appendChild(tr);
  }  
}

//////////////////////////////////////////////////////////////////
// Previous Pay Period
// Called when Previous button is clicked
//////////////////////////////////////////////////////////////////
function previousPayPeriod() {
  if (date.getDate() >= 16) {
    date.setDate(1);
  } else {
    date.setDate(0);
  }
  populateTimesheet();
  console.log(date);
}

//////////////////////////////////////////////////////////////////
// Current Pay Period
// Called when Current button is clicked
//////////////////////////////////////////////////////////////////

function currentPayPeriod() {
  const today = new Date();
  date.setDate(today.getDate());
  date.setMonth(today.getMonth());
  date.setFullYear(today.getFullYear());
  populateTimesheet();
  
  console.log(date);
}


//////////////////////////////////////////////////////////////////
// Next Pay Period
// Called when Next button is clicked
//////////////////////////////////////////////////////////////////
function nextPayPeriod() {
  if (date.getDate() >= 16) {
    date.setDate(32);
  } else {
    date.setDate(16);
  }
  populateTimesheet();
  console.log(date);
}

//////////////////////////////////////////////////////////////////
// Print Timesheet
// Called when Print button is clicked
//////////////////////////////////////////////////////////////////
function printTimesheet() {
  window.print();
}

//////////////////////////////////////////////////////////////////
// Populate Timesheet
// Fills the TImesheet Caption and Table
//////////////////////////////////////////////////////////////////
function populateTimesheet() {
  setCaption();
  setTimesheetBody();
}

//////////////////////////////////////////////////////////////////
// On Load...
const date = new Date();
// make timecards available 3 days in advance
// date.setDate(date.getDate() + 3);
let timesheetYear = date.getFullYear();
let timesheetMonth = date.getMonth(); // months are 0-based
let daysInTimesheetMonth = getDaysInMonth(timesheetYear, timesheetMonth);

// Actions
const previousBtn = document.querySelector(".btn-previous");
const currentBtn = document.querySelector(".btn-current");
const nextBtn = document.querySelector(".btn-next");
const printBtn = document.querySelector(".btn-print");

// Event Listeners
previousBtn.addEventListener("click", previousPayPeriod);
currentBtn.addEventListener("click", currentPayPeriod);
nextBtn.addEventListener("click", nextPayPeriod);
printBtn.addEventListener("click", printTimesheet);

populateTimesheet();