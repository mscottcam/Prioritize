let nock = require('nock');
let request = require('request');

describe('A testers sandbox paradise', function () {

  test('that it works', function (done) {
    let result = nock('http://www.example.com')
      .get('/package.json')
      .times(2)
      .reply(200, 'ok');

    var options = {
      url: 'http://www.example.com/package.json',
      method: 'GET',
    };

    request(options, function (err, response, body) {
      expect(body).toEqual('ok');
      done();
    });
    console.log(result);
  });
});