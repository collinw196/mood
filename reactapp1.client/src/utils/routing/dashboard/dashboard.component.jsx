import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setMoods } from '../../../app/store/moods/moods.slice'
import FormInput from '../../../components/form-input/form-input.component';
import MoodInput from '../../../components/mood-input/mood-input.component';
import './dashboard.styles.scss';
import { setMoodLog } from '../../../app/store/moodLogs/moodLogs.slice';
import { v4 as uuidv4 } from 'uuid';

const Dashboard = () => {
    const defaultFormFields = {
        hoursSleep: ''
    }
    // State variables
    const [formFields, setFormFields] = useState(defaultFormFields);
    const [userId, setUserId] = useState();
    const {hoursSleep} = formFields;
    const moods = useSelector((state) => state.moods.moods);
    const moodLogs = useSelector((state) => state.moodLogs.moodLogs);
    const currentUser = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();

    useEffect(() => {
        getMoods();
        getCurrentUserId();
    }, [])

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value});
    }

    const logUserMoods = async (event) => {
        event.preventDefault();
        const test = moodLogs;
        //Write stuff to rds db
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "moodLogId": uuidv4(),
                "userId": userId,
                "hoursSleep": hoursSleep,
                "deserializedMoodList": moodLogs
              })
        };
        await fetch('https://localhost:7117/MoodLog/PostUserMoods', requestOptions);
    }

    //Get moods from rds db
    const getMoods = async () => {
        await fetch('https://localhost:7117/Mood/GetMoods').then(response => response.json())
        .then(data => {
          console.log(data) 
          dispatch(setMoods(data));
        });
    }

    const getCurrentUserId = async () => {
        await fetch(`https://localhost:7117/User/GetUser/${currentUser}`)
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
        </div>
        
    );
}

export default Dashboard;