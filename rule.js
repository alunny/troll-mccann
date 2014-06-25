'use node.js';

function Rule(name, testFn, actionFn, prob) {
  this.name = name;
  this.test = testFn;
  this.action = actionFn;

  if (typeof prob == 'number') {
    this.probability = prob;
  }
}

Rule.prototype.test = function (status) {
  return false;
}

Rule.prototype.action = function (status, twitter) { }

Rule.prototype.probability = 0;

Rule.prototype.execute = function (status, twitter) {
  if (Math.random() < this.probability && this.test(status)) {
    this.action(status, twitter)
    return true;
  } else {
    console.log('not applying ' + this.name + ' for status ' + status.id_str);
    return false;
  }
}

module.exports = Rule;
