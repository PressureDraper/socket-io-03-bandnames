import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:9191';

export const socketConnection = io(URL, { autoConnect: false, transports: ['websocket'] });