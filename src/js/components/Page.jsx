var React = require('react');
var Scroll = require('react-scroll');

var Page = React.createClass({
  mixins: [Scroll.Helpers.Element],
  render: function () {
    return (
      <div id={this.props.name} className={this.props.className}>
        {this.props.children}
      </div>
    );
  }
});

var Link = React.createClass({
  mixins: [Scroll.Helpers.Scroll],
  getDefaultProps: function() {
    return {
      smooth: true,
      duration: 400
    };
  },
  render: function () {
    return (
      <a className={this.props.to} style={{cursor:'pointer'}} onClick={this.onClick}>
        {this.props.children}
      </a>
    );
  }
});

module.exports = { Page: Page, Link: Link }
