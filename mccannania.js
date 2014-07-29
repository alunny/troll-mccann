'use node.js';

var Rule = require('./rule');

function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

var medellin = '00698bbe577bad5b';

var inanities = [
  'nah brah',
  'impressive growth',
  'Cheers mate',
  'Yup.',
  'Ok.',
  'crying',
  'Massive achievement',
  'Seriously.',
  'WTF, actually',
  'umm…ok?',
  'Nailed It™',
  'ummm what???',
  'but tech is in a bubble, right?'
];

// tweets about $JCP get a fav
var JCPRule = new Rule('$JCP', function (status) {
  return /\$JCP/.test(status.text);
}, function (status, T) {
  T.post('favorites/create', { id: status.id_str }, function (err, data) {
    if (err) {
      console.warn(err);
    } else {
      console.log('faved a $JCP tweet');
    }
  });
}, 1.0);

// fallback - post an inanity every now and then
var inaneReplyRule = new Rule('inane', function (status) {
  return true;
}, function (status, T) {
  T.post('statuses/update', {
    status: '@joemccann ' + rand(inanities),
    place_id: medellin,
    in_reply_to_status_id: status.id_str
  }, function (err, data) {
    if (err) {
      console.warn(err);
    } else {
      console.log('posted status ' + data.id_str)
    }
  });
}, 0.15);

var rulesInOrder = [
  JCPRule,
  inaneReplyRule
];

module.exports = {
  rulesInOrder: rulesInOrder
}
