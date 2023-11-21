import SignInForm from '../../../components/sign-in-form/sign-in-form.component';
import SignUpForm from '../../../components/sign-up-form/sign-up-form.component';
import { fetchAllUsers, addUser } from '../../dynamodb/dynamodb.utils';
import './auth.styles.scss'

const Auth = () => {
    return (
        <div className='authentication-container'>
            <SignInForm />
            <SignUpForm />
        </div>
    )
}

export default Auth;