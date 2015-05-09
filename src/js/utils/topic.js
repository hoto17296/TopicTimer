var Time = require('./time.js');
var clone = require('clone');
var sprintf = require('sprintf');

var Topic = function(str) {
  str = str.split(/\s/).filter(function(v){ return !! v });
  var time = str[0].split('/', 2).map(function(v){ return new Time(v) });
  this.remain = time[0];
  this.entire = ( time.length < 2 ) ? clone(time[0]) : time[1];
  this.description = ( str.length < 2 ) ? '' : str[1];
  this.key = null;
}

Topic.prototype.toString = function() {
  return sprintf('%s/%s %s',
    this.remain.toString(),
    this.entire.toString(),
    this.description
  );
};

Topic.prototype.equal = function(topic) {
  return topic instanceof Topic && this.key && this.key === topic.key;
}

module.exports = Topic;
