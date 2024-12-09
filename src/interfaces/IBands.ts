import { Socket } from 'socket.io-client'

export interface BandsPropsInterface {
    [key: string]: any;
    id: string;
    name: string;
    votes: number;
}

export interface PropsSocketContext {
    socket: Socket | null;
    isOnline: boolean;
}