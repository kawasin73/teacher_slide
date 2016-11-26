import Peer from 'peerjs';

let peerId = "teacher";
let API_KEY = "e16bc721-d566-47ea-9de8-4a92bc8248c6"; // 悪用しないでね

export function startReceive(callBack) {
  let peer = new Peer(peerId, {key: API_KEY});
  peer.on('error', (error) => {
    console.log('error1');
    console.log(error);
  });
  var conn = peer.connect('another-peers-id');
  conn.on('open', function(){
    conn.send('hi!');
  });
  console.log("startReceive called!");

  peer.on('connection', (conn) => {
    console.log("connection opened!");
    conn.on('data', (data) => {
      console.log(data)
      callBack(data)
    });
  });
}

export function sendData(data) {
  let peer = new Peer({key: API_KEY});
  peer.on('error', (error) => {
    console.log('error2');
    console.log(error);
  });
  let connection = peer.connect(peerId);
  connection.send(data);
}
