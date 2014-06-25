'use $JCP';
var Rule = require('./rule');

function logErr(err, whatever) {
  if (err) {
    console.warn(err);
  }
}

function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

var medellinId = '00698bbe577bad5b';

var inanities = [
  'nah brah',
  'lol',
  'yeah bruv',
  'Yup.',
  'Ok.',
  'Damn wow',
  'Massive achievement',
  'Seriously.',
  'WTF, actually'
];

// tweets about $JCP get a fav
var JCPRule = new Rule(function (status) {
  return /\$JCP/.test(status.text);
}, function (status, T) {
  T.post('favorites/create', { id: status.id_str }, logErr);
}, 1.0);

// fallback - post an inanity every now and then
var inaneReplyRule = new Rule(function (status) {
  return true;
}, function (status, T) {
  T.post('statuses/update', {
    status: '@joemccann ' + rand(inanities),
    in_reply_to_status_id: status.id_str
  }, logErr);
}, 0.01);

var rulesInOrder = [
  JCPRule,
  inaneReplyRule
];

module.exports = {
  rulesInOrder: rulesInOrder
}
