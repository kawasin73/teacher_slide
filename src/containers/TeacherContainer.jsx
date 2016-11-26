import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {sendData} from '../lib/peer';

class TeacherContainer extends Component {
  componentDidMount() {
    sendData({type: 0, value: 0});
    sendData({type: 0, value: 1});
    sendData({type: 1, value: "hei"});
    sendData({type: 1, value: "hoi"});
    console.log("send finished!");
  }

  resizeSlide() {
    // TODO: resize
  }

  render() {
    return (
      <div>
        {this.props.teacher.iconQueue}
        {this.props.teacher.textQueue}
        {this.renderSlide()}
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
