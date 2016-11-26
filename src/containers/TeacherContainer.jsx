import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { sendData } from '../lib/peer';
import $ from '../lib/shims/jquery';


class TeacherContainer extends Component {
  componentDidMount() {
  }

  resizeSlide() {
    // TODO: resize
  }

  onClickhoge(e) {
    sendData({ type: 0, value: 0 });
    sendData({ type: 0, value: 1 });
    sendData({ type: 1, value: "hei" });
    sendData({ type: 1, value: "hoi" });
    console.log("send finished!");
  }

  animatingTexts() {
    let now = new Date($.now());
    return this.props.teacher.textQueue.filter((text) => text.isExpired(now));
  }

  render() {
    return (
      <div>
        <div onClick={this.onClickhoge.bind(this)}>hogehoge</div>
        {this.props.teacher.iconQueue}
        {this.animatingTexts().map((text) => this.renderText(text))}
        {this.renderSlide()}
      </div>
    )
  }

  renderText(text) {
    return (
      <div key={`text-${text.id}`}>
        {text.text}
      </div>
    )
  }

  renderSlide() {
    let height = window.screen.height;
    let html = `<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vQiTsrz3u4rkRBaORtaba5m0riMujZBm8h8Coph83Jz7bF0QSkq-zxlGqwXPt5j_7bfOJZt3b4xwLBU/embed?start=false&loop=false&delayms=3000" frameborder="0" width="100%" height="${height}" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>`;
    let htmlObject = { __html: html };
    return (
      <div dangerouslySetInnerHTML={htmlObject}/>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    teacher: state.teacher,
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherContainer)
