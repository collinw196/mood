import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";

const Navigation = () => {
    return (
        <Fragment>
            <Link to='/home'>
                Home Page
            </Link>
            <div className='nav-links-container'>
                <Link to='/auth'>
                    Sign In
                </Link>
            </div>
            <Outlet />
        </Fragment>
    )
}

export default Navigation;