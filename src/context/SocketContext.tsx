import { createContext } from "react";
import { useSocket } from "../hooks/useSocket";
import { PropsSocketContext } from "../interfaces/IBands";


export const SocketContext = createContext<PropsSocketContext>({ isOnline: false, socket: null });

export const SocketProvider = ({ children }: any) => {
    // "undefined" means the URL will be computed from the `window.location` object
    const { socket, isOnline } = useSocket(process.env.REACT_APP_NODE_ENVIRONMENT === 'production' ? undefined : `http://localhost:${process.env.REACT_APP_SOCKET_SERVER_PORT}`);

    return (
        <SocketContext.Provider value={{ socket, isOnline }}>
            {children}
        </SocketContext.Provider>
    )
}