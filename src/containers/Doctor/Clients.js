import React, { Component } from "react";
import Clients from "../../components/Doctor/Clients";
import axios from "axios";
import Header from "../../components/Main/Header";
import Nav from "../../components/Main/Navbar";

export class DoctorsClients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clients: [],
      token: sessionStorage.getItem("accessToken")
    };
  }

  handleClient = id => {
    this.props.history.push(`/doctor/record/${id}`);
  };

  handleSort = e => {
    if (e.target.value === "nameAZ") {
      let AZ = this.state.clients;
      let AZSort = AZ.sort((a, b) =>
        a.client > b.client ? 1 : a.client < b.client ? -1 : 0
      );
      this.setState({ clients: AZSort });
    } else if (e.target.value === "nameZA") {
      let ZA = this.state.clients;
      let ZASort = ZA.sort((b, a) =>
        b.client > a.client ? -1 : b.client < a.client ? 1 : 0
      );
      this.setState({ clients: ZASort });
    }
  };

  clients = () => {
    const access_token = "Bearer ".concat(this.state.token);

    axios
      .get("https://health-care-backend.herokuapp.com/api/doctor/clients/", {
        headers: { Authorization: access_token }
      })
      .then(response => {
        console.log(response);

        const res = response.data.data.map(val => {
          return { id: val.client_id, client: val.client };
        });
        console.log(res);

        this.setState({ clients: res });
      });
  };

  componentDidMount() {
    this.clients();
  }
  render() {
    console.log(this.state.clients);

    return (
      <div className="container">
        <Header />
        <Nav />
        <Clients
          clients={this.state.clients}
          handleClient={this.handleClient}
          handleSort={this.handleSort}
        />
      </div>
    );
  }
}

export default DoctorsClients;
