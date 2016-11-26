import { List, Record } from 'immutable';
import $ from '../lib/shims/jquery';

const _Text = Record({
  id: null,
  text: '',
  top: null,
  addedTime: null,
  animationTime: null,
});

var counter = 0;

function countId() {
  counter += 1;
  return counter;
}

function top() {
  return Math.random() * window.outerHeight;
}

function randomAnimation() {
  return Math.random() * 10 + 4;
}

export default class Text extends _Text {
  static fromJS(text) {
    return (new this).merge({
      id: countId(),
      text: text,
      top: top(),
      addedTime: new Date($.now()),
      animationTime: randomAnimation(),
    });
  }

  isExpired(date) {
    return date - this.addedTime < this.animationTime * 1000;
  }
}
