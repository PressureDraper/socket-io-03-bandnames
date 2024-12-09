import { BarChart } from '@mui/x-charts/BarChart';
import { Stack } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../context/SocketContext';
import { BandsPropsInterface } from '../interfaces/IBands';

export const dataset = [
    {
        id: "d080d551-5f78-4261-a8b0-0c93279ff41d",
        name: "Band2",
        votes: 1
    },
    {
        id: "d080d551-5f78-4261-a8b0-f493279ff41d",
        name: "Band3",
        votes: 4
    }
];

export function valueFormatter(value: number | null) {
    return `${value}mm`;
}

export const BandChart = () => {
    const { socket } = useContext(SocketContext);
    const [data, setData] = useState<BandsPropsInterface[]>([]);

    useEffect(() => {
        const getBands = (data: BandsPropsInterface[]) => {
            setData(data);
        }

        socket?.on('getBands', getBands);

        return () => {
            socket?.off('getBands', getBands);
        }
    }, [socket]);

    return (
        <Stack sx={{ width: '100%' }}>
            <BarChart
                dataset={data}
                yAxis={[{ scaleType: 'band', dataKey: 'name', tickLabelStyle: {
                    angle: -50,
                    textAnchor: 'end',
                    fontSize: 12,
                }, }]}
                series={[{ dataKey: 'votes', label: 'Bands', valueFormatter }]}
                layout="horizontal"
                xAxis={[{ label: 'Votes (#)' }]}
                height={400}
                margin={{ left: 100, right: 100 }}
            />
        </Stack>
    )
}
