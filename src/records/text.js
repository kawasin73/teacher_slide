import { List, Record } from 'immutable';
import $ from '../lib/shims/jquery';

const _Text = Record({
  id: null,
  text: '',
  addedTime: null,
  animationTime: null,
});

var counter = 0;

function countId() {
  counter += 1;
  return counter;
}

function randomAnimation() {
  return Math.random() * 5000 + 4000;
}

export default class Text extends _Text {
  static fromJS(text) {
    return (new this).merge({
      id: countId(),
      text: text,
      addedTime: new Date($.now()),
      animationTime: randomAnimation(),
    });
  }

  isExpired(date) {
    return date - this.addedTime < this.animationTime;
  }
}
