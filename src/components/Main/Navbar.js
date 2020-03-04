import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../../assets/main/navbar.scss';


const Nav = ({ register, login, handleLogout, isLoggedIn, handleDashboardDoctor, handleDashboardClient, handleDoctorProfile, handleClientProfile}) => {
    let dashboardLink = null;
    let profileLink = null;
    const isDoctor = sessionStorage.getItem('is_doctor')
    if (isDoctor === 'true') {
        dashboardLink = <Link to="/dashboard-doctor" className="dash" onClick={() => handleDashboardDoctor}>Dashboard</Link>;
        profileLink = <Link to="/doctor/profile" className="profile" onClick={handleDoctorProfile}>Profile</Link>;
    } else {
        dashboardLink = <Link to="/dashboard-client" className="dash" onClick={() => handleDashboardClient}>Dashboard</Link>;
        profileLink = <Link to="/client/profile" className="profile" onClick={handleClientProfile}>Profile</Link>;
    }
    return (
        <nav className="nav">        
            {!isLoggedIn &&
            <ul className="nav navbar-nav navbar-right">
                <li className="li-reg"><Link to="/register" onClick={register} className="register">Sign Up</Link></li>
                <li className="li-log"><Link to="/login" onClick={login} className="login">Log In</Link></li>
            </ul> 
            }
            {isLoggedIn && 
            <ul className="nav navbar-nav navbar-right">
                <li className="li-dash">{dashboardLink}</li>
                <li className="li-prof">{profileLink}</li>
                <li className="li-logout"><Link to="/logout" onClick={handleLogout} className="logout">Logout</Link></li>
            </ul>    
            }
        </nav>
    )
}

const mapStateToProps = state => {
    const user = state.getIn(['authReducer', 'user']);
    const isLoggedIn = state.getIn(['authReducer', 'isLoggedIn']);
    return {
        user,
        isLoggedIn,
    }
};

export default connect(mapStateToProps)(Nav);