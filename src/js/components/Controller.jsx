var React = require('react');
var Topic = require('../utils/topic');
var TimerActions = require('../actions/TimerActions');

module.exports = React.createClass({

  propTypes: {
    topic: React.PropTypes.instanceOf(Topic).isRequired
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

  render: function() {
    var topic = this.props.topic;
    return (
      <div className='controller'>
        <a style={{cursor:'pointer'}} className={topic.counting ? 'pause' : 'play'} onClick={this.toggle}></a>
        <a style={{cursor:'pointer'}} className='stop' onClick={this.stop}></a>
      </div>
    );
  }

});
