const caption1El = document.querySelector(".timesheet-caption-1");
const caption2El = document.querySelector(".timesheet-caption-2");

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
// Set Captions for both timesheets
//////////////////////////////////////////////////////////////////
function setCaptions() {
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

//////////////////////////////////////////////////////////////////
// On Load...
const date = new Date();
const timesheetYear = date.getFullYear();
const timesheetMonth = date.getMonth(); // months are 0-based
const daysIntimesheetMonth = getDaysInMonth(timesheetYear, timesheetMonth);


setCaptions();

