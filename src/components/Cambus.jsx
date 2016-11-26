import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules'

import styles from './Cambus.scss';


class Cambus extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <div styleName="base">
        {this.props.icons.map((icon) => this.renderIcon(icon))}
        {this.props.texts.map((text) => this.renderText(text))}
        {this.renderSlide()}
      </div>
    )
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
    )
  }

  renderIcon(icon) {
    let style = {
      top: icon.top,
      animationDuration: `${icon.animationTime}s`,
    };
    return (
      <div key={`icon-${icon.id}`} styleName="icon" style={style}>
        {icon.value}
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

export default CSSModules(Cambus, styles)
