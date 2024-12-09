import { useContext } from 'react'
import { BandList } from '../components/BandList'
import { BandAdd } from '../components/BandAdd'
import { SocketContext } from '../context/SocketContext'
import { BandChart } from '../components/BandChart'

export const HomePage = () => {
    const { isOnline } = useContext( SocketContext);

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
                <div className="col">
                    <BandChart />
                </div>
            </div>
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
