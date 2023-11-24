import { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { signInUser } from '../../utils/cognito/cognito.utils';
import UserConfirmationPopup from '../user-confirmation-popup/user-confirmation-popup.component';

const SignInForm = () => {
    const defaultFormFields = {
        username: '',
        password: ''
    }

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { username, password } = formFields;

    const [seen, setSeen] = useState(false);

    const togglePop = () => {
        setSeen(!seen);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            signInUser(username, password);
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
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Sign In</h2>
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" 
                value={username}
                onChange={handleChange}
                required />

                <label for="password">Password:</label>
                <input type="password" id="password" name="password"
                value={password}
                onChange={handleChange}
                required />

                <button type="submit" onSubmit={handleSubmit}>Sign In</button>
            </form>
            <div>
                <button onClick={togglePop}>Confirm User</button>
                {seen ? <UserConfirmationPopup toggle={togglePop} /> : null}
            </div>
        </div>
    )
}

export default SignInForm;