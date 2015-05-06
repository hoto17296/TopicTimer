var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TimerConstants = require('../constants/TimerConstants');
var assign = require('object-assign');
var clone = require('clone');

var CHANGE_EVENT = 'change';

var _topics = [];

var TopicStore = assign({}, EventEmitter.prototype, {

  // トピック一覧を取得する
  get: function() {
    return _topics;
  },

  // 変更を通知する
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    callback();
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

});

AppDispatcher.register(function(action) {

  switch(action.actionType) {

    case TimerConstants.TOPICS_UPDATE:
      if (action.topics) {
        _topics = action.topics;
        TopicStore.emitChange();
      }
      break;

    case TimerConstants.START_COUNTING:
      _topics = _topics.map(function(topic){
        topic.counting = topic.key == action.topic.key;
        return topic;
      });
      TopicStore.emitChange();
      break;

    case TimerConstants.PAUSE_COUNTING:
      _topics = _topics.map(function(topic){
        topic.counting = false;
        return topic;
      });
      TopicStore.emitChange();
      break;

    case TimerConstants.STOP_COUNTING:
      _topics = _topics.map(function(topic){
        if (topic.key == action.topic.key) {
          topic.counting = false;
          topic.remain = clone(topic.entire);
        }
        return topic;
      });
      TopicStore.emitChange();
      break;

    case TimerConstants.COUNTDOWN:
      _topics = _topics.map(function(topic) {
        if (topic.counting) {
          var remainTime = topic.remain.decrease();
          if (typeof(action.callback) == 'function') {
            action.callback(remainTime);
          }
        }
        return topic;
      });
      TopicStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = TopicStore;
