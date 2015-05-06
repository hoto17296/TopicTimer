var React = require('react');
var TimerActions = require('../actions/TimerActions');
var TopicStore = require('../stores/TopicStore');
var Page = require('./Page.jsx').Page;
var Nav = require('./Nav.jsx');
var Topic = require('./Topic.jsx');

module.exports = React.createClass({
  propTypes: {
    topics: React.PropTypes.array.isRequired
  },

  getInitialState: function() {
    return {
      editting: false,
      formText: '',
      beforeEdit: ''
    };
  },

  // 編集モードに切り替え
  edit: function(e){
    if (e) { e.preventDefault(); }
    var value = this.props.topics.join("\n");
    this.setState({
      editting: true,
      formText: value,
      beforeEdit: value
    });
  },

  // 編集中のテキストを保持する
  onUpdateForm: function(e) {
    this.setState({ formText: e.target.value });
  },

  // 編集完了したらトピック一覧を更新する
  onSubmit: function() {
    this.setState({ editting: false });
    if (this.state.beforeEdit != this.state.formText) {
      TimerActions.updateTopics( this.state.formText );
    }
  },

  // 編集開始したらフォーカスする
  componentDidUpdate: function(){
    if (this.refs.editForm) {
      this.refs.editForm.getDOMNode().focus();
    }
  },

  render: function(){
    // 編集時はテキストエリアを表示
    if (this.state.editting) {
      var placeholder = 'ここにトピックを入力';
      var content = (
        <textarea onChange={this.onUpdateForm} value={this.state.formText} ref='editForm' onBlur={this.onSubmit} placeholder={placeholder} />
      );
    }
    // 編集時以外はトピック一覧を表示
    else {
      var topics = this.props.topics.map(function(topic){ return <Topic topic={topic} key={topic.key} edit={this.edit} />; }, this);
      if ( topics.length ) {
        var content = (
          <table>
            {topics}
          </table>
        );
      } else {
        var content = <div className='empty' onClick={this.edit}>クリックしてトピックを入力</div>;
      }
    }
    return (
      <Page name='setting'>
        <Nav current='setting' />
        <div className='pageContent'>
          <h2>Setting</h2>
          {content}
        </div>
      </Page>
    );
  },
});
