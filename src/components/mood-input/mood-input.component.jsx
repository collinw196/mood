import { useState } from 'react';
import './mood-input.styles.scss'

const MoodInput = ({label}) => {
    const defaultFormFields = {
        isChecked: false,
        weight: 0
    }
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {isChecked, weight} = formFields;

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    }

    const toggleCheckbox = (event) => {
        const { name, checked } = event.target;
        if(checked)
            setFormFields({...formFields, [name]: checked});
        else
            setFormFields({...formFields, [name]: checked, weight: 0});
    }

    return (
        <div className='mood-input-container'>
            <input
                type="checkbox"
                name="isChecked"
                value={isChecked}
                onChange={toggleCheckbox}
            />
            <label>{label}</label>
            <div className='mood-weight-input-container'>
                <label>0 - 10</label>
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
            
        </div>
    )
}

export default MoodInput;