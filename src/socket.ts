import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.REACT_APP_NODE_ENVIRONMENT === 'production' ? undefined : `http://localhost:${process.env.REACT_APP_SOCKET_SERVER_PORT}`;

export const socketConnection = io(URL, { autoConnect: false, transports: ['websocket'] });