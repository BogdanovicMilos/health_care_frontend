import React, { Component } from 'react'
import { connect } from 'react-redux';
import Header from '../../components/Main/Header';
import LoginUser from '../../components/Auth/Login';
import Nav from '../../components/Main/Navbar';
import { userLogin, userLoggedIn } from '../../actions/authActions';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailValue: '',
            passwordValue: '',
            submitted: false,
            is_doctor: false
        } 
    }

    handleEmail = (e) => {
        this.setState({emailValue: e.target.value});
    }

    handlePassword = (e) => {
        this.setState({passwordValue: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.userLogin();
    }

    userLogin = async () => {
        const data = await fetch('http://127.0.0.1:8000/api/auth/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({
                email: this.state.emailValue,
                password: this.state.passwordValue,
            })
        });

        const jsonData = await data.json();
        console.log(jsonData, 'data')
        if (jsonData.is_doctor){
            this.setState({is_doctor: true});
        }else{
            this.setState({is_doctor: false});
        }
        this.props.dispatch(userLogin(jsonData.data.data));
        if (jsonData.data.access_token) {
            sessionStorage.setItem('accessToken', jsonData.data.access_token)
            sessionStorage.setItem('expiresIn', jsonData.data.expires_in)
            sessionStorage.setItem('is_doctor', this.state.is_doctor)
            localStorage.setItem('refreshToken', jsonData.data.refresh_token)
            this.props.dispatch(userLoggedIn());
        }
        this.redirectUser();
        return jsonData;
    }

    redirectUser = () => {
        if (this.props.isLoggedIn) {
            if (this.state.is_doctor) {  
                this.props.history.push('/dashboard-doctor');
            }else{
                this.props.history.push('/dashboard-client');
            }
        }else{
            this.props.history.push('/login');
        }
    }

    render() {
        return (
            <div className="container">
                <Header />
                <Nav />
                <LoginUser 
                    emailValue={this.state.emailValue}
                    passwordValue={this.state.passwordValue}
                    submitted={this.state.submitted}
                    handleEmail={this.handleEmail}
                    handlePassword={this.handlePassword}
                    handleSubmit={this.handleSubmit}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    const user = state.getIn(['authReducer', 'user']);
    const isLoggedIn = state.getIn(['authReducer', 'isLoggedIn']);
    return {
        user,
        isLoggedIn,
    }
  };

export default connect(mapStateToProps)(Login);
