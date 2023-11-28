import { useState } from 'react';
import { getIdentityPoolCredentials, 
    signInUser } from '../../utils/cognito/cognito.utils';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCurrentUser } from '../../app/store/user/user.slice';
import ModalPopup from '../modal-popup/modal-popup.component';
import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import './sign-in-form.styles.scss';

const SignInForm = () => {
    const defaultFormFields = {
        username: '',
        password: ''
    }

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { username, password } = formFields;

    const [seen, setSeen] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const togglePop = () => {
        setSeen(!seen);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            const user = signInUser(username, password);
            setFormFields(defaultFormFields);
            dispatch(setCurrentUser(user.username));
            navigate('/home');
        } catch(error) {
            console.log(error);
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    }

    const handleGoogleSignIn = (event) => {
        // event.preventDefault();
        // getIdentityPoolCredentials();
    }

    return (
        <div className='sign-in-container'>
            <form onSubmit={handleSubmit}>
                <h2>Sign In</h2>
                <FormInput type="text" id="username" name="username"
                label='Username' 
                value={username}
                onChange={handleChange}
                required />

                <FormInput type="password" id="password" name="password"
                label='Password' 
                value={password}
                onChange={handleChange}
                required />

                <div className='buttons-container'>
                    <Button type="submit" onSubmit={handleSubmit}>Sign In</Button>
                    <Button type="button" buttonType='google' 
                        onClick={handleGoogleSignIn}>Sign In with Google</Button>
                </div>
                
            </form>
            
            <div className='popup-container'>
                <div className='popup-link' onClick={togglePop}>Confirm User</div>
                {seen ? <ModalPopup toggle={togglePop} /> : null}
            </div>
        </div>
    )
}

export default SignInForm;