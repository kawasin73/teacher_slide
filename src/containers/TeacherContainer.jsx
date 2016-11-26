import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { sendData } from '../lib/peer';
import $ from '../lib/shims/jquery';

import Cambus from '../components/Cambus';

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
        <Cambus
          icons={this.props.teacher.iconQueue}
          texts={this.animatingTexts()}
        />
      </div>
    )
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
