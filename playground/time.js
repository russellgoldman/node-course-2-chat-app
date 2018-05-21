var moment = require('moment');

// Moment.js is a Date/Time module (see moment docs for 'format codes')

// create a new Moment object that represents the current point in time
var date = moment();
// we pass in patterns into format()
/*
MMM - shorthand of the Month
Do - prints in format '1st 2nd ... 30th 31st'
YYYY - full year
*/
// date.add(100, 'years').subtract(9, 'months');
console.log(date.format('MMM Do, YYYY'));

// valueOf returns the timestamp since the UNIX Epoch from the current time (from moment())
var someTimestamp = moment().valueOf();
console.log(someTimestamp);

// 1234 is a UNIX Epoch
var createdAt = 1234;
// forcing moment to use the custom time as the current time
var date = moment(createdAt);
console.log(date.format('h:mm a'))
