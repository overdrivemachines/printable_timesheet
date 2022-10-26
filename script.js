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
// Set Captions for both timesheets
//////////////////////////////////////////////////////////////////
function setCaptions() {
  const caption1El = document.querySelector(".timesheet-caption-1");
  const caption2El = document.querySelector(".timesheet-caption-2");

  // get the month name
  const monthName = date.toLocaleString('default', { month: 'long' });
  
  // Set Timesheet 1's caption
  caption1El.textContent = monthName + " 1 - 15, " + timesheetYear;

  // Set Timesheet 2's caption
  caption2El.textContent = monthName + " 16 - " + getDaysInMonth(timesheetYear, timesheetMonth) + ", " + timesheetYear;
}

//////////////////////////////////////////////////////////////////
// Set Timesheet Body
//////////////////////////////////////////////////////////////////
function setTimesheetBody() {
  const timesheetBody1El = document.querySelector(".timesheet-body-1");
  const timesheetBody2El = document.querySelector(".timesheet-body-2");

  // set a temporary date that will change from 1st to 31st in the loop
  let tempDate = new Date(date);
  tempDate.setDate(1);
  
  // Timesheet1
  for (let i = 1; i <= daysIntimesheetMonth; i++) {
    tempDate.setDate(i);
    const tr = document.createElement("tr");
    const tdDate = document.createElement("td");
    tdDate.textContent = i + getOrdinal(i);
    const tdDay = document.createElement("td");
    tdDay.textContent = tempDate.toLocaleDateString('en-us', { weekday: 'short' });
    const tdBlank = document.createElement("td");

    tr.appendChild(tdDate);
    tr.appendChild(tdDay);
    tr.appendChild(document.createElement("td"));
    tr.appendChild(document.createElement("td"));
    tr.appendChild(document.createElement("td"));
    tr.appendChild(document.createElement("td"));
    tr.appendChild(document.createElement("td"));

    if (i <= 15) {
      timesheetBody1El.appendChild(tr);
    } else {
      timesheetBody2El.appendChild(tr);
    }
    
  }
  
  
}

//////////////////////////////////////////////////////////////////
// On Load...
const date = new Date();
date.setDate(date.getDate() + 5);
const timesheetYear = date.getFullYear();
const timesheetMonth = date.getMonth(); // months are 0-based
const daysIntimesheetMonth = getDaysInMonth(timesheetYear, timesheetMonth);


setCaptions();
setTimesheetBody();
