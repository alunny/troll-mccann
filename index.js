'use $JCP';

var Twit = require('twit'),
    T = new Twit({
      consumer_key:         process.env['CONSUMER_KEY'],
      consumer_secret:      process.env['CONSUMER_SECRET'],
      access_token:         process.env['USER_TOKEN'],
      access_token_secret:  process.env['USER_SECRET']
    }),
    endpoint = 'statuses/user_timeline',
    sinceId;

function poll() {
  var params = {
    screen_name: 'joemccann', since_id: sinceId, count: 50
  };

  T.get(endpoint, params, function (err, data) {
    sinceId = data.map(function (s) { return s.id_str; })[0];
    console.log(data.length);

    data.filter(function (s) {
      return s.text.match('✈');
    }).forEach(function (s) {
      console.log(s.text);
    });
  });
}

poll(), setInterval(poll, 30000);
