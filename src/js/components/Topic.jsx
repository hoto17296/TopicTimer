var React = require('react');
var Topic = require('../utils/topic');
var Controller = require('./Controller.jsx');

module.exports = React.createClass({
  propTypes: {
    topic: React.PropTypes.instanceOf(Topic).isRequired,
    edit: React.PropTypes.func.isRequired
  },
  render: function() {
    var topic = this.props.topic;
    return (
      <tr className='topic'>
        <td>
          <Controller topic={topic} />
        </td>
        <td className='time' onClick={this.props.edit}>
          {topic.remain.toString()}/{topic.entire.toString()}
        </td>
        <td className='description' onClick={this.props.edit}>
          {topic.description}
        </td>
      </tr>
    );
  }
});
