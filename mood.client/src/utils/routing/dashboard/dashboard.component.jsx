import { useState } from 'react';
import FormInput from '../../../components/form-input/form-input.component';
import MoodInput from '../../../components/mood-input/mood-input.component';
import './dashboard.styles.scss';

const Dashboard = () => {
    const defaultFormFields = {
        hoursSleep: '',
    }
    // State variables
    const [formFields, setFormFields] = useState(defaultFormFields);
    //const { hoursSleep } = formFields;

    //const moods = useSelector((state) => state.moods.moods);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value});
    }

    const logMoods = (event) => {
        event.preventDefault();
        //Write shit to rds db
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
                <MoodInput label='Happy'/>
                <MoodInput label='Sad'/>
                <MoodInput label='Angry'/>
                <MoodInput label='Tired'/>

                <div className='buttons-container'>
                    <button onClick={logMoods}>Log Moods</button>
                </div>
            </div>
        </div>
        
    );
}

export default Dashboard;