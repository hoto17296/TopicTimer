var React = require('react');
var Topic = require('../utils/topic');
var TimerActions = require('../actions/TimerActions');
var StateStore = require('../stores/StateStore');

module.exports = React.createClass({

  propTypes: {
    topic: React.PropTypes.instanceOf(Topic).isRequired,
    prev: React.PropTypes.bool,
    next: React.PropTypes.bool,
  },

  getDefaultProps: function() {
    return {
      previous: false,
      next: false,
    };
  },

  isCounting: function() {
    var state = StateStore.get();
    return this.props.topic.equal( state.selected ) && state.counting;
  },

  toggle: function() {
    this.isCounting() ? this.pause() : this.start();
  },

  start: function() {
    TimerActions.startCounting(this.props.topic);
  },

  pause: function() {
    TimerActions.pauseCounting();
  },

  stop: function() {
    TimerActions.stopCounting(this.props.topic);
  },

  prev: function() {
    if (this.props.topic.prev) {
      TimerActions.startCounting(this.props.topic.prev);
    }
  },

  next: function() {
    if (this.props.topic.next) {
      TimerActions.startCounting(this.props.topic.next);
    }
  },

  render: function() {
    var prev = this.props.prev ? <a className='prev' onClick={this.prev}></a> : '';
    var next = this.props.next ? <a className='next' onClick={this.next}></a> : '';
    return (
      <div className='controller'>
        {prev}
        <a className={this.isCounting() ? 'pause' : 'play'} onClick={this.toggle}></a>
        <a className='stop' onClick={this.stop}></a>
        {next}
      </div>
    );
  }

});
