import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createStore } from "redux";
import { Provider as ReduxProvider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import SagaMiddlewareProvider from "./components/Main/sagaMiddlewareProvider";
import "./App.css";
import Main from "./containers/Home/Home";
import ClientDashboard from "./containers/Client/Dashboard";
import DoctorDashboard from "./containers/Doctor/Dashboard";
import DetailExam from "./containers/Doctor/DetailExam";
import Register from "./containers/Register/register";
import Login from "./containers/Login/login";
import Logout from "./containers/Logout/logout";
import ExamForm from "./containers/Client/ExamForm";
// import CheckoutForm from "./containers/Client/CheckoutForm";
import Correspondence from "./containers/Doctor/Correspondence";
import DoctorMessage from "./containers/Doctor/Message";
import DoctorProfile from "./containers/Doctor/Profile";
import DoctorsProfile from "./containers/Doctor/DoctorsProfile";
import ClientProfile from "./containers/Client/Profile";
import DetailVideoExam from "./containers/Doctor/DetailVideoExam";
import ProcessingVideoExam from "./containers/Doctor/ProcessingVideoExam";
import ClientRecord from "./containers/Doctor/Record";
import VideoReq from "./containers/Client/VideoReq";
import ClientVideoExamDetail from "./containers/Client/ClientVideoExamDetail";
import ClientDetailExam from "./containers/Client/DetailExam";
import ClientCorrespondence from "./containers/Client/Correspondence";
import ClientMessage from "./containers/Client/Message";
import { StripeProvider } from "react-stripe-elements";
import Clients from "./containers/Doctor/Clients";
import WaitingRoom from "./containers/Client/WaitingRoom";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLogin, userLoggedIn } from "./actions/authActions";
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";
import Footer from "./components/Main/Footer";
import allReducers from "./reducers";
import DoctorsCalendar from "./containers/Doctor/DoctorsCalendar";

class App extends Component {
  constructor(props) {
    super(props);

    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(allReducers, composeWithDevTools());

    store.runSaga = sagaMiddleware.run;
    this.sagaMiddleware = sagaMiddleware;
    this.store = store;
  }

  componentDidMount() {
    this.checkUser();
  }

  componentDidUpdate() {
    this.checkUser();
  }

  checkUser = () => {
    const accessToken = sessionStorage.getItem("accessToken");
    const expiresIn = sessionStorage.getItem("expiresIn");
    const isDoctor = sessionStorage.getItem("is_doctor");
    const refreshToken = localStorage.getItem("refreshToken");
    if (accessToken && expiresIn && refreshToken) {
      this.store.dispatch(
        userLogin({
          access_token: accessToken,
          expires_in: expiresIn,
          refresh_token: refreshToken,
          is_doctor: isDoctor
        })
      );
      this.store.dispatch(userLoggedIn());
    }
  };

  render() {
    return (
      <div className="App">
        <StripeProvider apiKey="pk_test_EolntZ7skKXUqmWzbnpuo1zy00ZxWVnWf3">
          <ReduxProvider store={this.store}>
            <SagaMiddlewareProvider sagaMiddleware={this.sagaMiddleware}>
              <Router>
                <Route path="/" exact component={Main} />
                <Route path="/register" exact component={Register} />
                <Route path="/login" exact component={Login} />
                <Route path="/logout" exact component={Logout} />

                <Route
                  path="/dashboard-client"
                  exact
                  component={ClientDashboard}
                />
                <Route
                  path="/dashboard-doctor"
                  exact
                  component={DoctorDashboard}
                />

                <Route
                  path="/doctor/exam/detail/:id"
                  exact
                  component={DetailExam}
                />
                <Route
                  path="/doctor/video/exam/detail/:id"
                  exact
                  component={DetailVideoExam}
                />
                <Route
                  path="/doctor/calendar"
                  exact
                  component={DoctorsCalendar}
                />
                <Route
                  path="/doctor/exam/correspondence/:id"
                  exact
                  component={Correspondence}
                />
                <Route
                  path="/doctor/exam/message/:id"
                  exact
                  component={DoctorMessage}
                />
                <Route
                  path="/doctor/profile/"
                  exact
                  component={DoctorProfile}
                />
                <Route
                  path="/client/doc/:id"
                  exact
                  component={DoctorsProfile}
                />
                <Route
                  path="/doctor/record/:id"
                  exact
                  component={ClientRecord}
                />
                <Route
                  path="/doctor/processing/video/exam/:id"
                  exact
                  component={ProcessingVideoExam}
                />
                <Route
                  path="/client/waiting-room"
                  exact
                  component={WaitingRoom}
                />

                <Route path="/client/profile" exact component={ClientProfile} />
                <Route
                  path="/client/exam/detail/:id"
                  exact
                  component={ClientDetailExam}
                />
                <Route
                  path="/client/video/exam/detail/:id"
                  exact
                  component={ClientVideoExamDetail}
                />
                <Route
                  path="/client/video-request"
                  exact
                  component={VideoReq}
                />

                <Route
                  path="/client/exam/correspondence/:id"
                  exact
                  component={ClientCorrespondence}
                />
                <Route
                  path="/doctors-clients"
                  exact
                  component={Clients}
                ></Route>
                <Route
                  path="/client/exam/message/:id"
                  exact
                  component={ClientMessage}
                />
                <Route path="/initiate" exact component={ExamForm} />
                {/* <Elements>
                  <Route path="/checkout" exact component={CheckoutForm} />
                </Elements> */}
                <Footer />
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
