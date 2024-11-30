import React, { useEffect, useState } from 'react'
import { BandAdd } from './components/BandAdd'
import { BandList } from './components/BandList'
import { Socket, io } from 'socket.io-client'

const connectSocketServer = () => {
    const socket = io("http://localhost:9191", { transports: ['websocket'] });
    return socket;
}

export const App = () => {
    const [socket, setSocket] = useState<Socket>(connectSocketServer());
    const [isOnline, setIsOnline] = useState<boolean>(false);
    const [bands, setBands] = useState();

    useEffect(() => {
        socket.on('connect', () => {
            setIsOnline(true);
        })
    }, [socket]);

    useEffect(() => {
        socket.on('disconnect', () => {
            setIsOnline(false);
        })
    }, [socket]);

    useEffect(() => {
        socket.on('getBands', (data) => {
            setBands(data);
        });
    }, [socket]); 

    return (
        <div className='container'>
            <div className="alert">
                <p>
                    Service Status:
                    <span className={isOnline ? 'text-success' : 'text-danger'}>{isOnline ? ' Online' : ' Offline'}</span>
                </p>
            </div>

            <h1>BandNames</h1>
            <hr />

            <div className="row">
                <div className="col-8">
                    <BandList />
                </div>
                <div className="col-4">
                    <BandAdd />
                </div>
            </div>
        </div>
    )
}

