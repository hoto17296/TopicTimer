var React = require('react');
var Link = require('./Page.jsx').Link;

String.prototype.capitalizeFirstLetter = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      pages: ['main', 'setting', 'usage', 'info'],
    };
  },
  render: function() {
    var links = this.props.pages.map(function(page){
      if (page != this.props.current) {
        return (
          <Link to={page} key={page}>
            <span className='popover'>{page.capitalizeFirstLetter()}</span>
          </Link>
        );
      }
    }, this);
    return <div className='nav'>{links}</div>;
  }
});
