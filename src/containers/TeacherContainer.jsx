import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { sendData } from '../lib/peer';
import $ from '../lib/shims/jquery';

import Cambus from '../components/Cambus';
import {FilterType} from '../actions/teacher';

class TeacherContainer extends Component {
  componentDidMount() {
  }

  animationIcons() {
    let now = new Date($.now());
    return this.props.teacher.iconQueue.filter((icon) => icon.isExpired(now)).filter((icon) => {
      console.log('icon.value', icon.value)
      switch (this.props.filterType) {
        case FilterType.ALL:
          return true;
        case FilterType.GOOD:
          return icon.value === '0';
        case FilterType.BORING:
          return icon.value === '1';
        case FilterType.UNDERSTAND:
          return icon.value === '2';
        case FilterType.NO_UNDERSTAND:
          return icon.value === '3';
        case FilterType.TEXT:
          return false;
        case FilterType.NONE:
          return false;
        default:
          return true;
      }
    });
  }

  animatingTexts() {
    let now = new Date($.now());
    return this.props.teacher.textQueue.filter((text) => text.isExpired(now)).filter(() => {
      return this.props.filterType === FilterType.ALL || this.props.filterType === FilterType.TEXT
    });
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
    filterType: state.teacher.filterType,
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherContainer)
