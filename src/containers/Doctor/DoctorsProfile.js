import React, { Component } from "react";
import axios from "axios";
import "../../assets/main/main.scss";
import DProfile from "../../components/Doctor/DoctorsProfile";

class DoctorProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctor: [],
      token: sessionStorage.getItem("accessToken"),
      id: this.props.match.params.id
    };
  }

  hanldeDoctorsProfile = () => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(
        `http://127.0.0.1:8000/api/client/doc/${this.state.id}`,
        {
          headers: { Authorization: access_token }
        }
      )
      .then(response => {
        console.log(response, "doc profile");

        return this.setState({ doctor: [response.data.data] });
      });
  };

  componentDidMount() {
    this.hanldeDoctorsProfile();
  }

  render() {
    return (
      <div className="container">
        <DProfile doctor={this.state.doctor} />
      </div>
    );
  }
}

export default DoctorProfile;
