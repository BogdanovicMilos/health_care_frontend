import React, { Component } from "react";
import axios from "axios";
import "../../assets/main/main.scss";
import Profile from "../../components/Client/Profile";
import { NotificationManager } from "react-notifications";

class ClientProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      client: [],
      records: [],
      addressValue: "",
      token: sessionStorage.getItem("accessToken")
    };
  }

  handleAddress = e => {
    this.setState({ addressValue: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const access_token = "Bearer ".concat(this.state.token);
    const data = await fetch(
      "http://127.0.0.1:8000/api/client/profile/",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: access_token
        },
        body: JSON.stringify({
          address: this.state.addressValue
        })
      }
    );
    const jsonData = await data.json();
    NotificationManager.success("Profile Updated!", "Successful!", 2000);
    this.handleClientProfile();
    console.log(jsonData);
  };

  handleClientProfile = async () => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(`http://127.0.0.1:8000/api/client/profile/`, {
        headers: { Authorization: access_token }
      })
      .then(response => {
        console.log(response.data.data, "profile");

        return this.setState({ client: [response.data.data] });
      });
  };

  record = async () => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(`http://127.0.0.1:8000api/client/records/`, {
        headers: { Authorization: access_token }
      })
      .then(response => {
        console.log(response, "profile2");

        return this.setState({ records: [response.data.data] });
      });
  };

  componentDidMount() {
    this.handleClientProfile();
    this.record();
  }

  render() {
    return (
      <div className="container">
        <Profile
          client={this.state.client}
          addressValue={this.addressValue}
          submitValue={this.submitValue}
          handleAddress={this.handleAddress}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default ClientProfile;
