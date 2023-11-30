import { useState } from "react"
import { signUpUser } from "../../utils/cognito/cognito.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

const SignUpForm = () => {
    const defaultFormFields = {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { username, email, password, confirmPassword } = formFields;

    const handleSubmit = (event) => {
        event.preventDefault();

        if(password !== confirmPassword) { 
            alert('Passwords do not match.'); 
            return;
        }

        try {
            const res = signUpUser(username, email, password);
            setFormFields(defaultFormFields);
            alert('Sign up successful!');
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
            <FormInput type="username" id="username" name="username"
                label='Username' 
                value={username}
                onChange={handleChange} 
                required />

            <FormInput type="email" id="email" name="email"
                label='Email' 
                value={email}
                onChange={handleChange} 
                required />

            <FormInput type="password" id="password" name="password" 
                label='Password'
                value={password}
                onChange={handleChange}
                required />

            <FormInput type="password" id="confirmPassword" name="confirmPassword"
                label = 'Confirm Password' 
                value={confirmPassword}
                onChange={handleChange} 
                required />

            <Button type="submit">Sign Up</Button>
        </form>
    )
}

export default SignUpForm;