export function datePretty(utc:string){
  
  const date = new Date(utc)
  return date.toLocaleString()
}

export function durationPretty(timeString:string){

  // Parse the milliseconds portion from the time string
  const milliseconds = parseFloat("0." + timeString.split('.')[1]);

  // Calculate the total milliseconds and create a Date object
  const totalMilliseconds = milliseconds * 1000;
  const date = new Date(totalMilliseconds);

  // Format the Date object to a human-readable time string
  const humanReadableTime = date.toLocaleTimeString(undefined, {
    hour12: false, // Use 24-hour time format
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    fractionalSecondDigits: 3, // Display up to 3 decimal places for milliseconds
  });

  return humanReadableTime
}