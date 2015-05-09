var React = require('react');
var Topic = require('../utils/topic');
var TimerActions = require('../actions/TimerActions');

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

  toggle: function() {
    this.props.topic.counting ? this.pause() : this.start();
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

  prev: function() {},
  next: function() {},

  render: function() {
    var topic = this.props.topic;
    var prev = this.props.prev ? <a className='prev' onClick={this.prev}></a> : '';
    var next = this.props.next ? <a className='next' onClick={this.next}></a> : '';
    return (
      <div className='controller'>
        {prev}
        <a className={topic.counting ? 'pause' : 'play'} onClick={this.toggle}></a>
        <a className='stop' onClick={this.stop}></a>
        {next}
      </div>
    );
  }

});
