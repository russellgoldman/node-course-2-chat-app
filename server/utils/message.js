var moment = require('moment');

var generateMessage = (from, text) => {
  return {
    from,
    text,
    createAt: moment().valueOf()
  }
};

var generateLocationMessage = (from, latitude, longitude) => {
  return  {
    from,
    url: `https://www.google.com/maps?q=${latitude},${longitude}`,  // google maps location query
    createdAt: moment().valueOf()   // create timestamp
  };
};

module.exports = {
  generateMessage,
  generateLocationMessage
};
