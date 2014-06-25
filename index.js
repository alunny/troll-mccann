'use strict';
var Twit = require('twit'),
    T = new Twit({
      consumer_key:         process.env['CONSUMER_KEY'],
      consumer_secret:      process.env['CONSUMER_SECRET'],
      access_token:         process.env['USER_TOKEN'],
      access_token_secret:  process.env['USER_SECRET']
    }),
    sinceId;

function poll() {
  T.get('statuses/user_timeline',
      { screen_name: 'joemccann', since_id: sinceId },
      function (err, data) {
        sinceId = data.map(function (s) { return s.id_str; })[0];
        console.log(data.length);
    });
}

poll(), setInterval(poll, 30000);
