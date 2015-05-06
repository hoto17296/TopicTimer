var Cookie = require('cookie');
var assign = require('object-assign');

var nextMonth = function(date) {
  date.setDate( date.getDate() + 30 );
  return date;
}

// デフォルトの有効期限を30日間にする
var defaultOpts = {
  expires: nextMonth(new Date())
};

module.exports = {

  set: function(name, str, opts) {
    opts = assign(defaultOpts, opts);
    document.cookie = Cookie.serialize(name, str, opts);
  },

  get: function(name) {
    var cookies = Cookie.parse(document.cookie);
    return ( name === undefined ) ? cookies : cookies[name];
  }

};
