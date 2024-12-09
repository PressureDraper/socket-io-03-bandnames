import React, { useContext, useEffect, useState } from 'react'
import { BandsPropsInterface } from '../interfaces/IBands';
import { SocketContext } from '../context/SocketContext';

export const BandList = () => {
    const { socket } = useContext(SocketContext);
    const [bands, setBands] = useState<BandsPropsInterface[]>([]);

    useEffect(() => {
        const getBands = (data: any) => {
            setBands(data);
        }

        socket?.on('getBands', getBands);

        return () => {
            socket?.off('getBands', getBands);
        }
    }, [socket]);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
        setBands((bands: BandsPropsInterface[]) => bands.map((band: BandsPropsInterface) => {
            if (band.id === id) {
                band.name = e.target.value;
            }

            return band;
        }));
    }

    const handleOnBlur = (id: string, name: string) => {
        socket?.emit('changeBandName', id, name)
    }

    const handleIncrementVotes = (id: string) => {
        socket?.emit('increseVotes', id);
    }

    const handleDeleteBand = (id: string) => {
        socket?.emit('deleteBand', id);
    }

    const createRows = () => {
        return (
            bands.map((band: BandsPropsInterface) => (
                <tr key={band.id}>
                    <td>
                        <button
                            className='btn btn-primary'
                            onClick={() => handleIncrementVotes(band.id)}
                        > + 1</button>
                    </td>
                    <td>
                        <input
                            type="text"
                            value={band.name}
                            className='form-control'
                            onChange={(e) => handleNameChange(e, band.id)}
                            onBlur={() => handleOnBlur(band.id, band.name)}
                        />
                    </td>
                    <td> <h3> {band.votes} </h3> </td>
                    <td>
                        <button
                            className="btn btn-danger"
                            onClick={() => handleDeleteBand(band.id)}
                        > Delete </button> </td>
                </tr>
            ))
        )
    }

    return (
        <>
            <table className='table table-stripped'>
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Votes</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {createRows()}
                </tbody>
            </table>
        </>
    )
}
