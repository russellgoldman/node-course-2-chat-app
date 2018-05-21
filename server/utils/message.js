var generateMessage = (from, text) => {
  return {
    from,
    text,
    createAt: new Date().getTime()
  }
};

var generateLocationMessage = (from, latitude, longitude) => {
  return  {
    from,
    url: `https://www.google.com/maps?q=${latitude},${longitude}`,  // google maps location query
    createdAt: new Date().getTime()   // create timestamp
  };
};

module.exports = {
  generateMessage,
  generateLocationMessage
};
