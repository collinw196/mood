import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOutUser } from "../../cognito/cognito.utils";
import { setCurrentUser } from "../../../app/store/user/user.slice";

const Navigation = () => {
    const currentUser = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();

    const handleSignOut = () => {
        signOutUser(currentUser);
        dispatch(setCurrentUser(null));
    }
    
    return (
        <Fragment>
            <div className='nav-links-container'>
                {
                    currentUser 
                    ? 
                    <Link to='/auth' onClick={handleSignOut}>
                        Sign Out
                    </Link> 
                    : 
                    <Link to='/auth'>
                        Sign In
                    </Link>
                }
            </div>
            <Outlet />
        </Fragment>
    )
}

export default Navigation;