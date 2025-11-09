import { io } from 'socket.io-client';

const socket = io("http://localhost:5000", {
  withCredentials: true,  // agar cookies use ho rahi ho to
  transports: ['websocket'], // optional: try forcing websocket only
  autoConnect: false, // control manually
});

export default socket;
