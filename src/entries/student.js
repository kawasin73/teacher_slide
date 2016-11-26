import morse from 'morse';
import $ from '../lib/shims/jquery';
import { sendData } from '../lib/peer';

$(document).ready(function () {

  $('.button').click(function (e) {
    var btn_id = $(this).attr('id');
    var val = $('#' + btn_id).val();
    var data = { type: 0, value: val };
    console.log(val);
    sendData(data);
  });


  var start;
  var morseMess = '';
  var lastTime;


  $(window).on('keydown', keydown);
  $(window).on('keyup', keyup);

  function registerOnFinish() {
    lastTime = new Date(jQuery.now());
    var keepLastTime = lastTime;

    function reset() {
      if (lastTime == keepLastTime) {
        console.log(morseMess);
        send(morseMess);
        morseMess = '';
        lastTime = 0;
      }
    }

    function space() {
      if (lastTime == keepLastTime) {
        morseMess = morseMess + ' ';
      }
    }

    setTimeout(space, 600);
    setTimeout(reset, 2000);
  }

  function send(morseText) {
    var text = morse.decode(morseText);
    console.log(text);
    sendData({
      type: 1,
      value: text,
    });
  }

  function keydown() {
    start = new Date(jQuery.now());
  }

  function keyup() {
    let stop = new Date(jQuery.now());
    let check = stop - start;
    if (check < 80) {
      morseMess = morseMess + '.';
    } else {
      morseMess = morseMess + '-';
    }
    //console.log(morse);
    registerOnFinish();
  }


});
