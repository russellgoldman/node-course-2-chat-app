// npm install expect --save-dev
var expect = require('expect');

var { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    // we're not requesting from an API so no need for done() (its only for async requests)
    var from = 'Jen';
    var text = 'Some message';
    var message = generateMessage(from, text);

    // expect(typeof message.createdAt).toBe('number');
    expect(message).toHaveProperty('from', from);
    expect(message).toHaveProperty('text', text);
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    // we're not requesting from an API so no need for done() (its only for async requests)
    var from = 'Deb';
    var latitude = 15;
    var longitude = 19;
    var url = 'https://www.google.com/maps?q=15,19';
    var message = generateLocationMessage(from, latitude, longitude);

    //expect(typeof message.createdAt).toBe('number');
    expect(message).toHaveProperty('from', from);
    expect(message).toHaveProperty('url', url);
  });
});
