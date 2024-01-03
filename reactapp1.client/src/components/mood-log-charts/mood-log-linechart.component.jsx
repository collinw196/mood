import { useState } from 'react';
import { LineChart, Line, CartesianGrid, 
    XAxis, YAxis, Tooltip } from 'recharts';
import './mood-log-linechart.styles.scss';

const MoodLogLineChart = ({ moodData }) => {
    const moodNames = Object.keys(moodData[1]).filter(key => key !== 'date');

    const transformData = () => {
        const moodNames = [];

        moodData.forEach(element => {
            Object.keys(element).filter(key => key !== 'date')
                .forEach(moodName => {
                    !moodNames.includes(moodName) ? moodNames.push(moodName) : null;
                });
        });

        return moodNames;
    }

    return (
        <LineChart width={600} height={300} data={moodData}>
            {transformData().map((moodName, index) => (
                <Line
                    key={index}
                    type="monotone"
                    dataKey={moodName}
                    stroke={`#${((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0')}`}
                />
            ))}
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
        </LineChart>
    );
}

export default MoodLogLineChart;