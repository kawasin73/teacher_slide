import { List, Record } from 'immutable';
import $ from '../lib/shims/jquery';

const _Icon = Record({
  id: null,
  value: '',
  top: 0,
  addedTime: null,
  animationTime: null,
  fontSize: 32,
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

function fontSize() {
  return Math.random() * 16 + 32;
}

export default class Icon extends _Icon {
  static fromJS(value) {
    return (new this).merge({
      id: countId(),
      value: value,
      top: top(),
      addedTime: new Date($.now()),
      animationTime: randomAnimation(),
      fontSize: fontSize(),
    });
  }

  isExpired(date) {
    return date - this.addedTime < this.animationTime * 1000;
  }

  inTime(date) {
    return date - this.addedTime < 20 * 1000;
  }

  text() {
    switch (this.value) {
      case '0':
        return 'いいね';
      case '1':
        return 'つまらない';
      case '2':
        return 'わかる';
      case '3':
        return 'わからない';
      default:
        return '';
    }
  }
}
