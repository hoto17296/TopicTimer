var React = require('react');
var Topic = require('../utils/topic');
var Page = require('./Page.jsx').Page;
var Nav = require('./Nav.jsx');
var Controller = require('./Controller.jsx');
var TimerActions = require('../actions/TimerActions');

module.exports = React.createClass({

  propTypes: {
    selected: React.PropTypes.instanceOf(Topic),
    bell: React.PropTypes.bool
  },

  toggleBell: function() {
    TimerActions.toggleBell();
  },

  render: function() {
    var selected = this.props.selected;
    var over = ( selected && selected.remain.isOver() ) ? 'over' : '';
    return (
      <Page name='main' className={over}>
        <div className='topicInfo'>
          <div className='description'>{selected ? selected.description : ''}</div>
          <div className='entireTime'>{selected ? selected.entire.toString() : ''}</div>
        </div>
        <Nav current='main' />
        {selected ? <Controller topic={selected} prev={true} next={true} /> : ''}
        <div className='bell'>
          <a className={this.props.bell ? 'on' : 'off'} onClick={this.toggleBell}>
            <span className='popover'>Bell</span>
          </a>
        </div>
        <div className='remainTime'>{selected ? selected.remain.toString() : '00:00'}</div>
      </Page>
    );
  }
});
