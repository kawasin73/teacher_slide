import morse from 'morse';
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
        if(lastTime == keepLastTime) {
            morseMess = morseMess+' ';
        }
    }
    setTimeout(space, 600);
    setTimeout(reset, 2000);
  }

  function send(morseText) {
    var text = morse.decode(morseText);
    console.log(text);
    connection.send(text);
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
