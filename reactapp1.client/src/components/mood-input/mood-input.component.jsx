import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './mood-input.styles.scss'
import { setMoodLog, addMoodLog, removeMoodLog } from '../../app/store/moodLogs/moodLogs.slice';

const MoodInput = ({label}) => {
    const defaultFormFields = {
        weight: 0,
        notes: ""
    }
    const [formFields, setFormFields] = useState(defaultFormFields);
    const [isChecked, setIsChecked] = useState(false);
    const moods = useSelector((state) => state.moodLogs.moodLogs);
    const dispatch = useDispatch();
    const {weight, notes} = formFields;

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
        dispatch(setMoodLog({moodName: label, ...formFields, [name]: value}));
        
    }

    const toggleCheckbox = (event) => {
        const { name, checked } = event.target;
        setIsChecked(checked);
        if(checked) {
            dispatch(addMoodLog({moodName: label, weight: 0, notes: ""})); 
        }
        else {
            dispatch(removeMoodLog({moodName: label, weight: 0}));
        }
    }

    return (
        <div className='mood-input-container'>
            <div className='checkbox-container'>
                <input
                    type="checkbox"
                    name="isChecked"
                    value={isChecked}
                    onChange={toggleCheckbox}
                />
                <label>{label}</label>
            </div>
            <div className='mood-weight-input-container'>
                <label className='mood-weight-label'>0 - 10</label>
                <input
                    type="number"
                    disabled={!isChecked}
                    value={weight}
                    max="10"
                    min="0"
                    className='mood-weight-input'
                    name="weight"
                    onChange={handleChange}
                />
            </div>
            <div className='mood-notes-input-container'>
                <label>Notes: </label>
                <input 
                    type="text"
                    disabled={!isChecked}
                    value={notes}
                    className="mood-notes-input"
                    name="notes"
                    onChange={handleChange}
                />
            </div>
        </div>
    )
}

export default MoodInput;