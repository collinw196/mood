import { useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, 
    XAxis, YAxis, Tooltip, Legend } from 'recharts';
import './mood-log-linechart.styles.scss';

const MoodLogLineChart = ({ moodData, colors }) => {
    const transformData = () => {
        const moodNames = [];

        moodData.forEach(element => {
            Object.keys(element).filter(key => key !== 'date' && key !== 'moodLogColors')
                .forEach(moodName => {
                    !moodNames.includes(moodName) ? moodNames.push(moodName) : null;
                });
        });
        return moodNames;
    }

    return (
        <LineChart className='line-chart-container' width={600} height={300} data={moodData}>
            {transformData().map((moodName, index) => (
                <Line
                    key={index}
                    type="monotone"
                    dataKey={moodName}
                    stroke={colors[moodName]}
                />
            ))}
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
        </LineChart>
    );
}

export default MoodLogLineChart;