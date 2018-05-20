// npm install expect --save-dev
var expect = require('expect');

var { generateMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = 'Jen';
    var text = 'Some message';
    var message = generateMessage(from, text);

    // expect(typeof message.createdAt).toBe(Date);
    expect(message).toHaveProperty('from', from);
    expect(message).toHaveProperty('text', text);
  });
});
