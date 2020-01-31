import React, { Component } from "react";
import Header from "../../components/Main/Header";
import InitiateExam from "../../components/Client/ExamForm";
import Nav from "../../components/Main/Navbar";
import axios from "axios";
import { connect } from "react-redux";
import { doctor } from "../../actions/examActions";

class ExamForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complete: false,
      specialities: [],
      doctors: [],
      filtered: [],
      subject: "",
      message: "",
      submitted: false,
      price: null,
      doctor_id: null,
      token: sessionStorage.getItem("accessToken"),
      specDoctor: [],
      specialSP: [],
      resetDoctorSelect: null
    };
  }

  handleSpeciality = e => {
    let filteredDoctors = this.state.doctors.filter(
      doctor => doctor.spec === e.label
    );

    this.setState({
      specialSP: e.value,
      specDoctor: filteredDoctors,
      resetDoctorSelect: null
    });
  };

  handleDoctor = e => {
    this.props.dispatch(doctor(e));
    this.setState({ doctor_id: e.iD });
    this.setState({ resetDoctorSelect: e });
  };

  handleSubject = e => {
    this.setState({ subject: e.target.value });
  };

  handleMessage = e => {
    this.setState({ message: e.target.value });
  };

  handleSubmit = async e => {
    const access_token = "Bearer ".concat(this.state.token);
    const response = await fetch("http://127.0.0.1:8000/api/client/initiate/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: access_token
      },
      body: JSON.stringify({
        speciality: this.state.specialSP,
        doctor: this.state.doctor_id,
        subject: this.state.subject,
        message: this.state.message
      })
    });
    const data = await response.json();

    this.toCheckout();
    return data;
  };

  toCheckout = async () => {
    return this.props.history.push("/checkout");
  };

  componentDidMount() {
    axios.get("http://127.0.0.1:8000/api/specialities/").then(response => {
      const res = response.data.message.map(val => {
        return { value: val.id, iD: val.speciality_id, label: val.name };
      });
      this.setState({ specialities: res });
    });
    axios.get("http://127.0.0.1:8000/api/doctor/list").then(response => {
      const res = response.data.message.map(val => {
        return {
          value: val.id,
          iD: val.doctor_id,
          label: val.doctor,
          spec: val.speciality,
          price: val.price
        };
      });
      this.setState({ doctors: res });
    });
  }

  render() {
    if (this.state.complete) return <h1>Submit Completed</h1>;
    return (
      <div className="container">
        <Header />
        <Nav />
        <InitiateExam
          specialities={this.state.specialities}
          subject={this.state.subject}
          message={this.state.message}
          submitted={this.state.submitted}
          handleSpeciality={this.handleSpeciality}
          handleDoctor={this.handleDoctor}
          handleSubject={this.handleSubject}
          handleSubmit={this.handleSubmit}
          handleMessage={this.handleMessage}
          specDoctor={this.state.specDoctor}
          resetDoctorSelect={this.state.resetDoctorSelect}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const doctor = state.getIn(["doctorReducer", "doctor"]);
  return {
    doctor,
    price: state.price
  };
};

export default connect(mapStateToProps)(ExamForm);
