import { List, Record } from 'immutable';
import $ from '../lib/shims/jquery';

const _Icon = Record({
  id: null,
  value: '',
  top: 0,
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

export default class Icon extends _Icon {
  static fromJS(value) {
    return (new this).merge({
      id: countId(),
      value: value,
      top: top(),
      addedTime: new Date($.now()),
      animationTime: randomAnimation(),
    });
  }

  isExpired(date) {
    return date - this.addedTime < this.animationTime * 1000;
  }
}
