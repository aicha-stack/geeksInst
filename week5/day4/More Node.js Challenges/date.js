
// Exercise 1: 
function timeUntilNewYear() {
  const now = new Date();
  const nextYear = now.getFullYear() + 1;
  const newYear = new Date(`January 1, ${nextYear} 00:00:00`);
  const diff = newYear - now; 

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return `The 1st January is in ${days} days and ${hours}:${minutes}:${seconds} hours`;
}


// Exercise 2: 

function minutesLived(birthdate) {
  const now = new Date();
  const birth = new Date(birthdate);
  const diff = now - birth; 

  const minutes = Math.floor(diff / (1000 * 60));
  return `You have lived approximately ${minutes} minutes.`;
}


// Exercise 3: 
function nextHoliday() {
  const now = new Date();

  
  const holidayName = "Christmas";
  const holidayDate = new Date(`December 25, ${now.getFullYear()} 00:00:00`);

 
  if (holidayDate < now) {
    holidayDate.setFullYear(now.getFullYear() + 1);
  }

  const diff = holidayDate - now;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return `Today is ${now.toLocaleDateString()}. The next holiday is ${holidayName} in ${days} days and ${hours}:${minutes}:${seconds} hours.`;
}


module.exports = {
  timeUntilNewYear,
  minutesLived,
  nextHoliday
};
