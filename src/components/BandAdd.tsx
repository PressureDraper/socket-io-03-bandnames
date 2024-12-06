import React, { useState } from 'react'
import { BandsGeneralInterface } from '../interfaces/IBands';

export const BandAdd = ({ socket }: BandsGeneralInterface) => {
    const [bandName, setBandName] = useState<string>('');

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (bandName.trim().length > 0) {
            setBandName('');
            socket.emit('addBand', bandName);
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
