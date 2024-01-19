import {
    PieChart, Pie, Cell,
    Label, LabelList, Tooltip, ResponsiveContainer
} from 'recharts';
import './mood-log-piechart.styles.scss';

const MoodLogPieChart = ({ moodData, date, colors }) => {
    const renderCustomizedLabel = (entry) => {
        return entry.moodName;
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p className="label">{`${payload[0].name} : ${payload[0].value}`}</p>
                    <p className="desc">{`Notes: ${payload[0].payload.notes}`}</p>
                </div>
            );
        }

        return null;
    };

    return (
        <div className='pie-chart-container'>
            <label className='pie-chart-label'>
                Mood Log from {date}
                <br />
                Hours of Sleep Previous Night: {moodData.hoursSleep} 
            </label>
            <PieChart width={730} height={250}>
                <Tooltip content={<CustomTooltip />} />
                <Pie data={moodData?.deserializedMoodList} dataKey="weight"
                    nameKey="moodName" cx="50%" cy="50%" outerRadius={80} label={renderCustomizedLabel}>
                    {
                        moodData?.deserializedMoodList.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[entry['moodName']]} />
                        ))
                    }
                </Pie>
            </PieChart>
        </div>
    );
}

export default MoodLogPieChart;