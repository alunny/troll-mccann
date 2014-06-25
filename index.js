'use node.js';

var Twit = require('twit'),
    rules = require('./mccannania').rulesInOrder,
    T = new Twit({
      consumer_key:         process.env['CONSUMER_KEY'],
      consumer_secret:      process.env['CONSUMER_SECRET'],
      access_token:         process.env['USER_TOKEN'],
      access_token_secret:  process.env['USER_SECRET']
    }),
    endpoint = 'statuses/user_timeline',
    oneMinute = 60 * 1000,
    sinceId;

function applyRules(status) {
  var i;

  for (i=0; i<rules.length; i++) {
    if (rules[i].execute(status, T)) break;
  }
}

function setSinceId(callback) {
  T.get(endpoint, { screen_name: 'joemccann' }, function (err, data) {
    sinceId = data.map(function (s) { return s.id_str; })[0];

    setTimeout(callback, oneMinute);
  });
}

function poll() {
  console.log('checking since ' + sinceId)
  var params = {
    screen_name: 'joemccann', since_id: sinceId
  };

  T.get(endpoint, params, function (err, data) {
    var filtered;

    if (data.length > 0) {
      sinceId = data.map(function (s) { return s.id_str; })[0];

      // ditch RTs and replies
      var filtered = data.filter(function (s) {
        return !(s.in_reply_to_status_id || /^RT /.test(s.text));
      });

      filtered.forEach(function (s) { applyRules(s) });
    }

    setTimeout(poll, oneMinute);
  });
}

setSinceId(poll);
