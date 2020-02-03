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
      "https://health-care-backend.herokuapp.com/api/client/profile/",
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
      .get(`https://health-care-backend.herokuapp.com/api/client/profile/`, {
        headers: { Authorization: access_token }
      })
      .then(response => {
        return this.setState({ client: Object.values(response.data) });
      });
  };

  record = async () => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(`https://health-care-backend.herokuapp.com/api/client/records/`, {
        headers: { Authorization: access_token }
      })
      .then(response => {
        return this.setState({ records: Object.values(response.data) });
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
