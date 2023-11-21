import { useState } from "react"
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { addUser } from "../../utils/dynamodb/dynamodb.utils";
import {v4 as uuidv4} from 'uuid';



const SignUpForm = () => {
    const defaultFormFields = {
        email: '',
        password: '',
        confirmPassword: ''
    }

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password, confirmPassword } = formFields;

    const handleSubmit = (event) => {
        event.preventDefault();

        if(password !== confirmPassword) { 
            alert('passwords do not match'); 
            return;
        }

        try {
            let userId = uuidv4();
            const res = addUser(userId, email, password);
            setFormFields(defaultFormFields);
        } catch(error) {
            
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    }

    return(
        <form onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" 
                value={email}
                onChange={handleChange} 
                required />

            <label for="password">Password:</label>
            <input type="password" id="password" name="password" 
                value={password}
                onChange={handleChange}
                required />

            <label for="confirmPassword">Confirm Password:</label>
            <input type="password" id="confirmPassword" name="confirmPassword" 
                value={confirmPassword}
                onChange={handleChange} 
                required />

            <button type="submit">Sign Up</button>
        </form>
    )
}

export default SignUpForm;