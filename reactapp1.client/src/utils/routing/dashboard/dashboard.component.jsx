import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setMoods } from '../../../app/store/moods/moods.slice';
import FormInput from '../../../components/form-input/form-input.component';
import MoodInput from '../../../components/mood-input/mood-input.component';
import './dashboard.styles.scss';
import "react-datepicker/dist/react-datepicker.css";
import { v4 as uuidv4 } from 'uuid';
import MoodLogLineChart from '../../../components/mood-log-charts/mood-log-linechart.component';
import MoodLogPieChart from '../../../components/mood-log-charts/mood-log-piechart.component'
import DatePicker from "react-datepicker";
import moment from 'moment';

const Dashboard = ({apiBase}) => {
    const defaultFormFields = {
        hoursSleep: ''
    }

    // State variables
    const [formFields, setFormFields] = useState(defaultFormFields);
    const [pieChartMoodLogs, setPieChartMoodLogs] = useState();
    const [lineChartMoodLogs, setLineChartMoodLogs] = useState();
    const [colors, setColors] = useState({});
    const [userId, setUserId] = useState(0);
    const [date, setDate] = useState(new Date());
    const { hoursSleep } = formFields;

    // Redux variables
    const moods = useSelector((state) => state.moods.moods);
    const moodLogs = useSelector((state) => state.moodLogs.moodLogs);
    const currentUser = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();

    useEffect(() => {
        getMoods();
        getCurrentUserId();
        getMoodLogsForUser();
    }, []);

    useEffect(() => {
        getMoodLogsForDate();
    }, [userId, date])

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    }

    //Writes user's moodLog to db
    const logUserMoods = async (event) => {
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "moodLogId": uuidv4(),
                "userId": userId,
                "hoursSleep": hoursSleep,
                "date": new Date(),
                "deserializedMoodList": moodLogs
            })
        };
        await fetch(`${apiBase}/MoodLog/PostUserMoods`, requestOptions)
            .then(response => {
                response.json(); 
                getMoodLogsForDate();
                getMoodLogsForUser();
            })
            .then(data => {
                if(data !== undefined)
                    alert('Moods successfully logged');
            });
    }

    //Get moodLogs for current user on the given date
    const getMoodLogsForDate = async () => {
        await fetch(`${apiBase}/MoodLog/GetUserMoods/${userId}/${moment(date).format("MM-DD-YYYY")}`)
            .then(response => response.json())
            .then(data => {
                setPieChartMoodLogs(data[0]);
                setFormFields({ hoursSleep: data[0].hoursSleep });
            });
    }

    //Get all moodLogs for current user
    const getMoodLogsForUser = async () => {
        await fetch(`${apiBase}/MoodLog/GetUserMoods/${userId}`)
        .then(response => response.json())
        .then(data => {
            setLineChartMoodLogs(data.map(item => 
                {
                    const moodLogsFormattedForLineChart = item.deserializedMoodList.reduce((acc, curr) => {
                        const { moodName, weight } = curr;
                        return {...acc, [moodName]: weight};
                    }, [])
                    return {'date': moment(item.date).format("MM-DD-YYYY"), ...moodLogsFormattedForLineChart}
                }));
        });
    }

    //Get moods from rds db
    const getMoods = async () => {
        await fetch(`${apiBase}/Mood/GetMoods`)
            .then(response => response.json())
            .then(data => {
                dispatch(setMoods(data));

                var moodColors = {};
                data.forEach(item => {
                    moodColors = {...moodColors, [item['moodName']]: item['color']}
                })
                setColors(moodColors);
            });
    }

    //Get current userId
    const getCurrentUserId = async () => {
        await fetch(`${apiBase}/User/GetUser/${currentUser}`)
            .then(response => response.json())
            .then(data => {setUserId(data.userId)})
    }

    return (
        <div className='dashboard-container'>

            <div className='form-container'>
                <h2 className='header'>Mood Manager</h2>
                <FormInput
                    label="How many hours of sleep did you get last night?"
                    type="number"
                    name="hoursSleep"
                    onChange={handleChange}
                    placeholder={hoursSleep}
                />

                <label>How have you been feeling today?</label>

                {
                    moods?.map(mood => (
                        <MoodInput key={mood.moodId} label={mood.moodName} />
                    ))
                }

                <div className='buttons-container'>
                    <button onClick={logUserMoods}>Log Moods</button>
                </div>
            </div>

            <div className='chart-container'>
                <DatePicker 
                    className='pie-chart-datepicker'
                    showIcon 
                    selected={date} 
                    onChange={(date) => setDate(date)} />
                {
                    pieChartMoodLogs !== undefined ?
                    <MoodLogPieChart moodData={pieChartMoodLogs} colors={colors} date={date.toDateString()} />
                    : <div>No data for the selected date.</div>
                }
                {
                    lineChartMoodLogs !== undefined ?
                    <MoodLogLineChart moodData={lineChartMoodLogs} colors={colors}/>
                    : <div>No data to display</div>
                }
            </div>
        </div>

    );
}

export default Dashboard;