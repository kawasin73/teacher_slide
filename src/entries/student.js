import morse from 'morse';
import $ from '../lib/shims/jquery';
import { sendData } from '../lib/peer';

$(document).ready(function () {

  $('.btn').click(function (e) {
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

  $('#morse').mousedown(keydown);
  $('#morse').mouseup(keyup);

  function registerOnFinish() {
    lastTime = new Date($.now());
    var keepLastTime = lastTime;

    function reset() {
      if (lastTime === keepLastTime) {
        console.log(morseMess);
        send(morseMess);
        morseMess = '';
        lastTime = 0;
        $('.morse-check').empty();
      }
    }

    function space() {
      if (lastTime === keepLastTime) {
        morseMess = morseMess + ' ';
        $('.morse-check').prepend('<sapn class="m-check"> </span>');
      }
    }

    setTimeout(space, 400);
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
    start = new Date($.now());
  }

  function keyup() {
    let stop = new Date($.now());
    let check = stop - start;
    console.log('check time:', check);
    if (check < 80) {
      morseMess = morseMess + '.';
      $('.morse-check').prepend('<sapn class="m-check">.</span>');
    } else {
      morseMess = morseMess + '-';
      $('.morse-check').prepend('<sapn class="m-check">-</span>');
    }
    //console.log(morse);
    registerOnFinish();
  }


});
