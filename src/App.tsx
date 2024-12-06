import React, { useEffect, useState } from 'react'
import { BandAdd } from './components/BandAdd'
import { BandList } from './components/BandList'
import { Socket } from 'socket.io-client'
import { socketConnection } from './socket'
import { BandsPropsInterface } from './interfaces/IBands'

export const App = () => {
    const [socket, setSocket] = useState<Socket>(socketConnection);
    const [isOnline, setIsOnline] = useState<boolean>(false);
    const [bands, setBands] = useState<BandsPropsInterface[]>([]);

    useEffect(() => {//connect socket when component is rendered and disconnects when is unmounted only if has to be used in specific component of the application. If the socket is needed in all the app remove cleanup function
        socket.connect();

        /* return () => {
            socket.disconnect();
        } */
    }, []);

    useEffect(() => {
        const connect = () => {
            setIsOnline(true);
        }

        socket.on('connect', connect);

        return () => { //turn off listener
            socket.off('connect', connect);
        }
    }, [socket]);

    useEffect(() => {
        const disconnect = () => {
            setIsOnline(false);
        }

        socket.on('disconnect', disconnect);

        return () => {
            socket.off('disconnect', disconnect);
        }
    }, [socket]);

    useEffect(() => {
        const getBands = (data: any) => {
            setBands(data);
        }

        socket.on('getBands', getBands);

        return () => {
            socket.off('getBands', getBands);
        }
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
                    <BandList
                        data={bands}
                        socket={socket}
                    />
                </div>
                <div className="col-4">
                    <BandAdd
                        socket={socket}
                    />
                </div>
            </div>
        </div>
    )
}

