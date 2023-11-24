import { useState } from 'react';
import './user-confirmation.popup.styles.scss';
import { confirmUser, resendCode } from '../../utils/cognito/cognito.utils';

const UserConfirmationPopup = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');

    const handleResendCode = (event)  => {
        event.preventDefault();
        resendCode(username);
        //props.toggle()
    }

    const handleConfirmation = (e) => {
        e.preventDefault();
        confirmUser(username, code);
        props.toggle();
    }

    const close = (e) => {
        e.preventDefault();
        props.toggle();
    }

    return (
        <div className="popup">
            <div className="popup-inner">
                <h2>Enter credentials to recieve verification code in email</h2>
                <form onSubmit={handleConfirmation}>
                    <label>
                        Username:
                        <input type="text" value={username} required onChange={e => setUsername(e.target.value)} />
                    </label>

                    <label>Verification code:</label>
                    <input value={code} onChange={e => setCode(e.target.value)} />
                    <button type="submit">Confirm user</button>
                    <button type="button" onClick={handleResendCode}>Resend Code</button>
                    <button type="button" onClick={close} className='closeButton'>Close</button>
                </form>
            </div> 
        </div>
    );
}

export default UserConfirmationPopup;