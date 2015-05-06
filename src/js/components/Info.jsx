var React = require('react');
var Page = require('./Page.jsx').Page;
var Nav = require('./Nav.jsx');

module.exports = React.createClass({
  render: function() {
    return (
      <Page name='info'>
        <Nav current='info' />
        <div className='pageContent'>
          <h2>Info</h2>
          <h3>このアプリについて</h3>
          <p>
            Topic Timer は、ミーティングやプレゼンテーションでのタイムキーピングのためのアプリです。
            決められた時間通りに物事を進めたいという場合にご活用ください。
          </p>
          <h3>お問い合わせ</h3>
          <p>
            不具合・改善要望などありましたら、
            <a href='https://github.com/hoto17296/TopicTimer' target='_blank'>GitHub</a> にプルリクエストを投げるか、
            <a href='http://hoto.me/' target='_blank'>@hoto17296</a> までご連絡ください。
          </p>
        </div>
      </Page>
    );
  }
});
