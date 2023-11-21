import { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { validateUserLogin } from '../../utils/dynamodb/dynamodb.utils';

const SignInForm = () => {
    const defaultFormFields = {
        userName: '',
        password: ''
    }

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { userName, password } = formFields;

    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            validateUserLogin(userName, password);
            setFormFields(defaultFormFields);
        } catch(error) {
            console.log(error);
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Sign In</h2>
            <label for="username">Email:</label>
            <input type="text" id="userName" name="userName" 
            value={userName}
            onChange={handleChange}
            required />

            <label for="password">Password:</label>
            <input type="password" id="password" name="password"
            value={password}
            onChange={handleChange}
            required />

            <button type="submit" onSubmit={handleSubmit}>Sign In</button>
        </form>
    )
}

export default SignInForm;