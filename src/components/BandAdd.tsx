import React, { useContext, useState } from 'react';
import { SocketContext } from '../context/SocketContext';

export const BandAdd = () => {
    const [bandName, setBandName] = useState<string>('');
    const { socket } = useContext(SocketContext);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (bandName.trim().length > 0) {
            setBandName('');
            socket?.emit('addBand', bandName);
        }
    }

    return (
        <>
            <h3>Add Band</h3>
            <form onSubmit={(e) => onSubmit(e)}>
                <input
                    type="text"
                    className='form-control'
                    placeholder='New band name'
                    value={bandName}
                    onChange={(e) => setBandName(e.target.value)}
                />
            </form>
        </>
    )
}
