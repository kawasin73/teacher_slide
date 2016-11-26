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

  animationIcons() {
    let now = new Date($.now());
    return this.props.teacher.iconQueue.filter((icon) => icon.isExpired(now));
  }

  animatingTexts() {
    let now = new Date($.now());
    return this.props.teacher.textQueue.filter((text) => text.isExpired(now));
  }

  render() {
    return (
      <div>
        <Cambus
          icons={this.animationIcons()}
          texts={this.animatingTexts()}
          enabled={this.props.teacher.enabledFlow}
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
