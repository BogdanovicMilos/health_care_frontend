import React, { Component } from "react";
import axios from "axios";
import Home from "../../components/Main/Home";
// import { doctor } from "../../actions/examActions";
// import { connect } from "react-redux";
import Header from "../../components/Main/Header";
import Nav from "../../components/Main/Navbar";

const token = sessionStorage.getItem("accessToken");
const access_token = "Bearer ".concat(token);

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctors: [],
      specialities: []
    };
  }

  handleDoctor = id => {
    // this.props.dispatch(doctor(id));
    this.props.history.push(`/client/doc/${id}`);
  };

  handleConsultation = e => {
    // let doctorID = e.currentTarget.dataset.id;
    // this.props.dispatch(doctor(doctorID));
    this.props.history.push("/initiate");
  };

  handleDashboardDoctor = () => {
    this.props.history.push("/dashboard-doctor");
  };

  handleDashboardClient = () => {
    this.props.history.push("/dashboard-client");
  };

  handleClients = () => {
    this.props.history.push("/doctors-clients");
  };

  componentDidMount() {
    axios
      .get("https://health-care-backend.herokuapp.com/api/doctor/list", {
        headers: { Authorization: access_token }
      })
      .then(response => {
        const res = response.data.data.map(val => {
          return {
            id: val.id,
            doctor: val.doctor,
            speciality: val.speciality,
            price: val.price
          };
        });

        this.setState({ doctors: res });
      });
    axios
      .get("https://health-care-backend.herokuapp.com/api/specialities/", {
        headers: { Authorization: access_token }
      })
      .then(response => {
        const res = response.data.data.map(val => {
          return { value: val.id, iD: val.speciality_id, label: val.name };
        });
        this.setState({ specialities: res });
      });
  }

  render() {
    // console.log(this.props.doctor);

    return (
      <div className="container">
        <Header />
        <Nav />
        <Home
          doctors={this.state.doctors}
          handleDoctor={this.handleDoctor}
          handleConsultation={this.handleConsultation}
          handleClients={this.handleClients}
          props={this.state}
        />
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     doctor: state.doctor
//   };
// };

export default Main;
