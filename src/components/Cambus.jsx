import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules'

import styles from './Cambus.scss';


class Cambus extends Component {
  componentDidMount() {
  }

  render() {
    let queues;
    if (this.props.enabled) {
      queues = (
        <div>
          <div styleName="counter_list">
            <span styleName="counter">いいね： {this.props.goodCount}</span>
            <span styleName="counter">つまらない： {this.props.boringCount}</span>
            <span styleName="counter">わかる： {this.props.understandCount}</span>
            <span styleName="counter">わからない： {this.props.noUnderstandCount}</span>
          </div>
          {this.props.icons.map((icon) => this.renderIcon(icon))}
          {this.props.texts.map((text) => this.renderText(text))}
        </div>
      );
    } else {
      queues = (null);
    }
    return (
      <div styleName="base">
        {queues}
        {this.renderSlide()}
      </div>
    );
  }

  renderText(text) {
    let style = {
      top: text.top,
      animationDuration: `${text.animationTime}s`,
    };
    console.log('style', style);
    return (
      <div key={`text-${text.id}`} styleName="text" style={style}>
        {text.text}
      </div>
    );
  }

  renderIcon(icon) {
    let style = {
      top: icon.top,
      animationDuration: `${icon.animationTime}s`,
    };
    return (
      <div key={`icon-${icon.id}`} styleName="icon" style={style}>
        {icon.text()}
      </div>
    );
  }

  renderSlide() {
    let height = window.outerHeight;
    let html = `<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vQiTsrz3u4rkRBaORtaba5m0riMujZBm8h8Coph83Jz7bF0QSkq-zxlGqwXPt5j_7bfOJZt3b4xwLBU/embed?start=false&loop=false&delayms=3000" frameborder="0" width="100%" height="${height}" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>`;
    let htmlObject = { __html: html };
    return (
      <div dangerouslySetInnerHTML={htmlObject}/>
    );
  }
}

export default CSSModules(Cambus, styles)
