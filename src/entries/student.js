import $ from '../lib/shims/jquery';
import Peer from '../lib/shims/peer';

$(document).ready(function () {

  var APIKEY = "e16bc721-d566-47ea-9de8-4a92bc8248c6";
  var peer = new Peer({ key: APIKEY });
  var id = 'teacher';

  peer.on('open', function (id) {
    console.log('create student peer');
  });
  peer.on('error', function (err) {
    console.log(err);
  });

  peer.on('connection', function (conn) {
    console.log('connection ok');
  });

  var connection = peer.connect(id);

  $('.button').click(function (e) {
    var btn_id = $(this).attr('id');
    var val = $('#' + btn_id).val();
    var data = { type: 0, value: val };
    console.log(val);
    connection.send(data);
  });


  var start;
  var morse = '';
  var lastTime;


  $(window).on('keydown', keydown);
  $(window).on('keyup', keyup);

  function registerOnFinish() {
    lastTime = new Date(jQuery.now());
    var keepLastTime = lastTime;

    function reset() {
      if (lastTime == keepLastTime) {
        console.log(morse);
        send(morse);
        morse = '';
        lastTime = 0;
      }
    }

    setTimeout(reset, 1000);
  }

  function send(morseText) {
    console.log('send', morseText);
    connection.send(morseText);
  }

  function keydown() {
    start = new Date(jQuery.now());
  }

  function keyup() {
    let stop = new Date(jQuery.now());
    let check = stop - start;
    if (check < 90) {
      morse = morse + '.';
    } else {
      morse = morse + '-';
    }
    //console.log(morse);
    registerOnFinish();
  }


});
