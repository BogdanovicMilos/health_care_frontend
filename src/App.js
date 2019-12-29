import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider as ReduxProvider } from 'react-redux';
import { combineReducers } from 'redux-immutable';
import createSagaMiddleware from 'redux-saga';
import SagaMiddlewareProvider from './components/Main/sagaMiddlewareProvider';
import './App.css';
import Main from './containers/Home/Home';
import ClientDashboard from './containers/Client/Dashboard';
import DoctorDashboard from './containers/Doctor/Dashboard';
import DetailExam from './containers/Doctor/DetailExam';
import Register from './containers/Register/register';
import Login from './containers/Login/login';
import Logout from './containers/Logout/logout';
import ExamForm from './containers/Client/ExamForm';
import CheckoutForm from './containers/Client/CheckoutForm';
import Correspondence from './containers/Doctor/Correspondence';
import DoctorProfile from './containers/Doctor/Profile';
import DoctorsProfile from './containers/Doctor/DoctorsProfile';
import {Elements, StripeProvider} from 'react-stripe-elements';
import authReducer from './reducers/authReducer';
import doctorReducer from './reducers/doctorReducer';
import subjectReducer from './reducers/subjectReducer';
import specReducer from './reducers/specReducer';
import examReducer from './reducers/examReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userLogin, userLoggedIn } from './actions/authActions';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';


class App extends Component {
  constructor(props){
    super(props);

    const sagaMiddleware = createSagaMiddleware();

    const combinedReducers = combineReducers({
      authReducer,
      doctorReducer,
      subjectReducer,
      specReducer,
      examReducer
    });

    const store = createStore(
      combinedReducers,
      composeWithDevTools()
    );
    
    store.runSaga = sagaMiddleware.run;
    this.sagaMiddleware = sagaMiddleware;
    this.store = store
  
  }

  componentDidMount(){
    this.checkUser();
  }

  componentDidUpdate(){
    this.checkUser();
  }

  checkUser = () => {
    const accessToken = sessionStorage.getItem('accessToken')
    const expiresIn = sessionStorage.getItem('expiresIn')
    const refreshToken = localStorage.getItem('refreshToken')
    if (accessToken && expiresIn && refreshToken) {
        this.store.dispatch(userLogin({
            'access_token': accessToken,
            'expires_in': expiresIn,
            'refresh_token': refreshToken
        }));
        this.store.dispatch(userLoggedIn());
    }
  }

  render(){
      return (
        <div className="App">
           <StripeProvider apiKey="pk_test_EolntZ7skKXUqmWzbnpuo1zy00ZxWVnWf3">
            <ReduxProvider store={this.store}>
              <SagaMiddlewareProvider sagaMiddleware={this.sagaMiddleware}>       
                <Router>
                  <Route path="/" exact component={Main}/>
                  <Route path="/register" exact component={Register} />
                  <Route path="/login" exact component={Login} />
                  <Route path="/logout" exact component={Logout} />
                  <Route path="/dashboard-client" exact component={ClientDashboard} />
                  <Route path="/dashboard-doctor" exact component={DoctorDashboard}/>
                  <Route path="/doctor/exam/detail" exact component={DetailExam}/>
                  <Route path="/doctor/exam/correspondence" exact component={Correspondence}/>
                  <Route path="/doctor/profile" exact component={DoctorProfile}/>
                  <Route path="/doctor/profile/:id" exact component={DoctorsProfile}/>
                  <Route path="/initiate" exact component={ExamForm} />
                  <Elements>
                    <Route path="/checkout" exact component={CheckoutForm} />
                  </Elements>
                  <NotificationContainer />
                </Router>
              </SagaMiddlewareProvider>
            </ReduxProvider>
          </StripeProvider>
        </div>
    );
  }
}

export default App;
