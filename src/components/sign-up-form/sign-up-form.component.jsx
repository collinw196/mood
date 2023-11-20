import { useState } from "react"
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

const SignUpForm = () => {
    const defaultFormFields = {
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const handleSubmit = (event) => {
        event.preventDefault();

        if(password !== confirmPassword) { 
            alert('passwords do not match'); 
            return;
        }

        try {
            // const { user } = await createAuthUserWithEmailAndPassword(email, password);
            // const userDoc = await createUserDocumentFromAuth(user, { displayName });
            setFormFields(defaultFormFields);
        } catch(error) {
            if(error.code === 'auth/email-already-in-use') {
                alert('email already in use');
            }
            console.log(error);
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <label for="username">Username:</label>
            <TextInput type="text" id="username" name="username" value={displayName} required />

            <label for="email">Email:</label>
            <TextInput type="email" id="email" name="email" value={email} required />

            <label for="password">Password:</label>
            <TextInput type="password" id="password" name="password" value={password} required />

            <label for="confirmPassword">Confirm Password:</label>
            <TextInput type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} required />

            <button type="submit">Sign Up</button>
        </form>
    )
}

export default SignUpForm;