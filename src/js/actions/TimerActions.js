var AppDispatcher = require('../dispatcher/AppDispatcher');
var TimerConstants = require('../constants/TimerConstants');
var StateStore = require('../stores/StateStore');
var Topic = require('../utils/topic');
var sha1 = require('sha1');

var _timer = null;
var audio = new Audio('./lib/dora.mp3');

module.exports = {

  // トピック一覧を更新する
  updateTopics: function(str) {
    AppDispatcher.dispatch({
      actionType: TimerConstants.TOPICS_UPDATE,
      topics: this._parseTopics(str)
    });
  },

  // カウントを開始する
  startCounting: function(topic){
    clearInterval(_timer);
    this._scrollTop();
    _timer = setInterval(this.countDown, 1000);
    AppDispatcher.dispatch({
      actionType: TimerConstants.START_COUNTING,
      topic: topic
    });
    AppDispatcher.dispatch({
      actionType: TimerConstants.STATES_UPDATE,
      states: { selected: topic }
    });
  },

  // カウントを一時停止する
  pauseCounting: function() {
    clearInterval(_timer);
    AppDispatcher.dispatch({
      actionType: TimerConstants.PAUSE_COUNTING
    });
  },

  // カウントを停止する
  stopCounting: function(topic) {
    if (topic.counting) {
      clearInterval(_timer);
    }
    AppDispatcher.dispatch({
      actionType: TimerConstants.STOP_COUNTING,
      topic: topic
    });
  },

  // カウントダウンする
  countDown: function(){
    var bell = StateStore.get().bell;
    AppDispatcher.dispatch({
      actionType: TimerConstants.COUNTDOWN,
      callback: function(remainTime){
        if (remainTime === 0 && bell) {
          audio.play();
        }
      }
    });
  },

  // Bell の ON/OFF を切り替える
  toggleBell: function(){
    AppDispatcher.dispatch({
      actionType: TimerConstants.TOGGLE_BELL
    });
  },

  // 文字列の各行をパースしてTopicオブジェクトを生成する
  _parseTopics: function(str){
    return str
      .split("\n").filter(function(v){ return !! v.trim() }) // 改行で分割して空行を除去
      .map(function(v, idx){
        try {
          var topic = new Topic(v);
        } catch (e) {
          console.warn(e);
          return;
        }
        topic.key = sha1( JSON.stringify([ topic.entire.toString(), topic.description, idx ]) );
        return topic;
      })
      .filter(function(v){ return !! v }); // パースできなかった行を除外
  },

  // スムーススクロールする
  _scrollTop: function() {
    var _id = setInterval(function(){
      var x = document.documentElement.scrollLeft || document.body.scrollLeft;
      var y = document.documentElement.scrollTop || document.body.scrollTop;
      window.scrollTo(x, y * 15 / 16);
      if (y == 0) { clearInterval(_id); }
    }, 10);
  }

};
