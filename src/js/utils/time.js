var sprintf = require('sprintf').sprintf;

// 「分:秒」形式の文字列からオブジェクト生成
var Time = function(str) {
  arr = str.split(':', 2);
  this._time = 0;
  if (arr[0]) { this._time += Math.abs(parseInt(arr[0])) * 60; }
  if (arr[1]) { this._time += parseInt(arr[1]); }
  if ( arr[0].match(/^-/) ) { this._time *= -1; }
  if ( isNaN(this._time) ) { throw new Error('Can\'t parse time: ' + str); }
}

// 「分:秒」形式の文字列にして返す
Time.prototype.toString = function() {
  var time = this._time;
  var negative = '';
  if (time < 0) {
    time *= -1;
    negative = '-';
  }
  var min = Math.floor( time / 60 );
  var sec = time % 60;
  return sprintf('%s%02d:%02d', negative, min, sec);
}

// 1秒減らす
Time.prototype.decrease = function(n) {
  if ( n === undefined ) { n = 1; }
  return this._time -= n;
}

Time.prototype.isOver = function() {
  return this._time < 0;
};

module.exports = Time;
