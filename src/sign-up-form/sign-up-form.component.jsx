import { useState } from "react"
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

const SignUpForm = () => {
    const [userName, setUserName] = useState('');

    return(
        <form>
            <h2>Sign Up</h2>
            <label for="username">Username:</label>
            <TextInput type="text" id="username" name="username" required />

            <label for="email">Email:</label>
            <TextInput type="email" id="email" name="email" required />

            <label for="password">Password:</label>
            <TextInput type="password" id="password" name="password" required />

            <label for="confirmPassword">Confirm Password:</label>
            <TextInput type="password" id="confirmPassword" name="confirmPassword" required />

            <button type="submit">Sign Up</button>
        </form>
    )
}