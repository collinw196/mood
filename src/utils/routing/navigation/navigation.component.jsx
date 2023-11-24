import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";
import { getCurrentUser, signOutUser } from "../../cognito/cognito.utils";

const Navigation = () => {
    const handleSignOut = () => {
        signOutUser(getCurrentUser().getUserName());
    }
    const currentUser = getCurrentUser();
    return (
        <Fragment>
            <Link to='/home'>
                Home Page
            </Link>
            <div className='nav-links-container'>
                {
                    currentUser !== null ? 
                    <Link onClick={handleSignOut}>
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