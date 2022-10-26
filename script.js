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

  timesheetBody1El.textContent = "";
  timesheetBody2El.textContent = "";

  console.log(timesheetBody2El);

  // set a temporary date that will change from 1st to 31st in the loop
  let tempDate = new Date(date);
  tempDate.setDate(1);
  
  // Create rows for timesheet table
  for (let i = 1; i <= daysInTimesheetMonth; i++) {
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
    if (i <= 15) {
      // timesheet 1 table body
      timesheetBody1El.appendChild(tr);
    } else {
      // timesheet 2 table body
      timesheetBody2El.appendChild(tr);
    }
    
  }  
}

//////////////////////////////////////////////////////////////////
// On Load...
const date = new Date();
// make timecards available 5 days in advance
date.setDate(date.getDate() + 5);
const timesheetYear = date.getFullYear();
const timesheetMonth = date.getMonth(); // months are 0-based
const daysInTimesheetMonth = getDaysInMonth(timesheetYear, timesheetMonth);

setCaptions();
setTimesheetBody();