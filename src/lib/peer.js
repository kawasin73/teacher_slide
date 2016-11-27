// import Peer from 'peerjs';
import Peer from './shims/peer';

let peerId = "test2";
let API_KEY = "e16bc721-d566-47ea-9de8-4a92bc8248c6"; // 悪用しないでね

export function startReceive(callBack) {
  let peer = new Peer(peerId, { key: API_KEY });
  peer.on('error', (error) => {
    console.log('error1');
    console.log(error);
  });
  console.log("startReceive called!");

  peer.on('connection', (conn) => {
    console.log("connection opened!");
    conn.on('open', () => {
      console.log('conn opened');
    });
    conn.on('data', (data) => {
      console.log("data received");
      console.log(data);
      callBack(data);
    });
  });
}

let sendPeer = new Peer({ key: API_KEY });
let sendConnection = sendPeer.connect(peerId);

sendPeer.on('error', (error) => {
  console.log('error2');
  console.log(error);
});

export function sendData(data) {
  sendConnection.send(data);
}
