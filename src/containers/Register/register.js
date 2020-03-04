import React, { Component } from "react";
import "../../App.css";
import Header from "../../components/Main/Header";
import RegisterUser from "../../components/Auth/Register";
import Nav from "../../components/Main/Navbar";
import axios from "axios";
import { NotificationManager } from "react-notifications";

const options = [
  { value: "M", label: "Male" },
  { value: "F", label: "Female" }
];

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userType: "client",
      emailValue: "",
      firstNameValue: "",
      lastNameValue: "",
      passwordValue: "",
      addressValue: "",
      birthDateValue: "",
      npiNumValue: "",
      prefixValue: "",
      specOptions: [],
      specValue: "",
      genderValue: "",
      selectedGenderValue: "",
      selectedSpecValue: ""
    };
  }

  handleUserType = userType => {
    this.setState({ userType });
  };

  handleEmail = e => {
    this.setState({ emailValue: e.target.value });
  };

  handleFirstName = e => {
    this.setState({ firstNameValue: e.target.value });
  };

  handleLastName = e => {
    this.setState({ lastNameValue: e.target.value });
  };

  handlePass = e => {
    this.setState({ passwordValue: e.target.value });
  };

  handleGender = genderValue => {
    this.setState({ genderValue });
    let { value } = genderValue;

    this.setState({ selectedGenderValue: value });
  };

  handleAddress = e => {
    this.setState({ addressValue: e.target.value });
  };

  handleBirthDate = e => {
    this.setState({ birthDateValue: e.target.value });
  };

  handleNpiNum = e => {
    this.setState({ npiNumValue: e.target.value });
  };

  handlePrefix = e => {
    this.setState({ prefixValue: e.target.value });
  };

  handleSpec = specValue => {
    this.setState({ specValue });
    let { value } = specValue;
    this.setState({ selectedSpecValue: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (
      this.state.userType === "client" &&
      this.state.emailValue &&
      this.state.firstNameValue &&
      this.state.lastNameValue &&
      this.state.passwordValue &&
      this.state.selectedGenderValue &&
      this.state.addressValue &&
      this.state.birthDateValue
    ) {
      this.userRegister();
    } else if (
      this.state.userType === "doctor" &&
      this.state.emailValue &&
      this.state.firstNameValue &&
      this.state.lastNameValue &&
      this.state.passwordValue &&
      this.state.npiNumValue &&
      this.state.prefixValue &&
      this.state.selectedSpecValue
    ) {
      this.userRegister();
    } else {
      NotificationManager.error("All Fields Are Required", "Failed!", 2000);
    }
  };

  componentDidMount() {
    axios
      .get("https://health-care-backend.herokuapp.com/api/specialities/")
      .then(response => {
        const res = response.data.data.map(val => {
          return { value: val.id, label: val.name };
        });
        this.setState({ specOptions: res });
      });
  }

  userRegister = async () => {
    if (this.state.userType === "client") {
      const client = await fetch(
        "https://health-care-backend.herokuapp.com/api/auth/register/client/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: this.state.emailValue,
            first_name: this.state.firstNameValue,
            last_name: this.state.lastNameValue,
            password: this.state.passwordValue,
            client: {
              gender: this.state.selectedGenderValue,
              address: this.state.addressValue,
              birth_date: this.state.birthDateValue
            }
          })
        }
      );
      this.props.history.push("/login");
      NotificationManager.success(
        "An email for confirmation will be sent shortly",
        "Successful!",
        4000
      );
      const jsonData = await client.json();
      return jsonData;
    } else if (this.state.userType === "doctor") {
      const doctor = await fetch(
        "https://health-care-backend.herokuapp.com/api/auth/register/doctor/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: this.state.emailValue,
            first_name: this.state.firstNameValue,
            last_name: this.state.lastNameValue,
            password: this.state.passwordValue,
            doctor: {
              npi_number: this.state.npiNumValue,
              prefix: this.state.prefixValue,
              speciality: this.state.selectedSpecValue
            }
          })
        }
      );
      this.props.history.push("/login");
      NotificationManager.success(
        "An email for confirmation will be sent shortly",
        "Successful!",
        4000
      );
      const jsonData = await doctor.json();
      return jsonData;
    }
  };

  render() {
    return (
      <div className="container">
        <Header />
        <Nav />
        <div className="radioDiv">
          <h4 className="head">You are?</h4>
          <input
            type="radio"
            name="userType"
            value="client"
            checked={this.state.userType === "client" ? true : false}
            onChange={() => this.handleUserType("client")}
            style={{ margin: "0 5px 0 0" }}
          />
          <label className="clientLabel">A Client</label>
          <input
            type="radio"
            name="userType"
            value="doctor"
            checked={this.state.userType === "doctor" ? true : false}
            onChange={() => this.handleUserType("doctor")}
            style={{ margin: "0 5px 0 0" }}
          />
          <label className="doctorLabel">A Doctor</label>
        </div>
        <RegisterUser
          userType={this.state.userType}
          emailValue={this.state.emailValue}
          firstNameValue={this.state.firstNameValue}
          lastNameValue={this.state.lastNameValue}
          passwordValue={this.state.passwordValue}
          genderValue={this.state.genderValue}
          genderOptions={options}
          addressValue={this.state.addressValue}
          birthDateValue={this.state.birthDateValue}
          npiNumValue={this.state.npiNumValue}
          prefixValue={this.state.prefixValue}
          specValue={this.state.specValue}
          specOptions={this.state.specOptions}
          submitValue={this.state.submitValue}
          handleEmail={this.handleEmail}
          handleFirstName={this.handleFirstName}
          handleLastName={this.handleLastName}
          handlePass={this.handlePass}
          handleGender={this.handleGender}
          handleAddress={this.handleAddress}
          handleBirthDate={this.handleBirthDate}
          handleNpiNum={this.handleNpiNum}
          handlePrefix={this.handlePrefix}
          handleSpec={this.handleSpec}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default Register;
