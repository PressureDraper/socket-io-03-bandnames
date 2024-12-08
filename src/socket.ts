import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? undefined : process.env.SOCKET_SERVER_PORT;

export const socketConnection = io(URL, { autoConnect: false, transports: ['websocket'] });