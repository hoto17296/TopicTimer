var React = require('react');
var Page = require('./Page.jsx').Page;
var Nav = require('./Nav.jsx');

module.exports = React.createClass({
  render: function() {
    return (
      <Page name='usage'>
        <Nav current='usage' />
        <div className='pageContent'>
          <h2>Usage</h2>
          <p>「分:秒 トピック名」の形式でトピックを入力します。</p>
          <code>5:00 前回MTGの振り返り<br/>15:00 話し合い</code>
          <p>「秒」と「トピック名」は省略可能です。</p>
          <code>5 前回MTGの振り返り<br/>15</code>
          <p>入力されたトピック情報は Cookie に保持されます。削除したい場合は入力エリアを空にして保存してください。</p>
          <p>タイマー画面右下のサウンド設定が ON (<i className='bellOn' />) になっていると、残り時間が 00:00 になったときに音が鳴ります。</p>
        </div>
      </Page>
    );
  }
});
