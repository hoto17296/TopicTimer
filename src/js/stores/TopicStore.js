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

    case TimerConstants.RESET_TOPIC:
      _topics.map(function(topic){
        if ( topic.equal( action.topic ) ) {
          topic.remain = clone( topic.entire );
        }
      });
      TopicStore.emitChange();
      break;

    case TimerConstants.COUNTDOWN:
      var remainTime = action.topic.remain.decrease();
      if (typeof(action.callback) == 'function') {
        action.callback(remainTime);
      }
      TopicStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = TopicStore;
