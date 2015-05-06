var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TimerConstants = require('../constants/TimerConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _states = {
  selected: null,
  bell: true,
};

var setStates = function(key, val) {
  if (key instanceof Object) { // setStates({ key: val }) の形式で呼ばれた場合
    _states = assign(_states, key);
  } else { // setStates(key, val) の形式で呼ばれた場合
    _states[key] = val;
  }
}

var StateStore = assign({}, EventEmitter.prototype, {

  // State一覧を取得する
  get: function() {
    return _states;
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

    case TimerConstants.STATES_UPDATE:
      if (action.states) {
        setStates(action.states);
        StateStore.emitChange();
      }
      break;

    case TimerConstants.TOPICS_UPDATE:
      if (action.topics && _states.selected) {
        var selected = null;
        action.topics.map(function(topic){
          if (topic.equal(_states.selected)) {
            selected = topic;
          }
        });
        setStates({ selected: selected });
        StateStore.emitChange();
      }
      break;

    case TimerConstants.TOGGLE_BELL:
      setStates({ bell: ! _states.bell });
      StateStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = StateStore;
