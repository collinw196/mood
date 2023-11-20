import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

const SignInForm = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            // const {user} = await signInWithUserEmailAndPassword(email, password);
            // setFormFields(defaultFormFields);
        } catch(error) {
            switch(error.code) {
                case 'auth/wrong-password':
                    alert('Incorrect password');
                    break;
                case 'auth/user-not-found':
                    alert('Email not found');
                    break;
                default:
                    console.log(error);
                    break;
            }
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Sign In</h2>
            <label for="username">Username or Email:</label>
            <TextInput type="text" id="username" name="username" required />

            <label for="password">Password:</label>
            <TextInput type="password" id="password" name="password" required />

            <Button type="submit">Sign In</Button>
        </form>
    )
}

export default SignInForm;