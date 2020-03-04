import React, { Component } from "react";
import axios from "axios";
import Detail from "../../components/Client/DetailExam";

class ClientDetailExam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exam: [],
      statusValue: "",
      selectedStatus: "",
      token: sessionStorage.getItem("accessToken"),
      id: this.props.match.params.id
    };
  }

  handleCancel = async () => {
    this.props.history.push("/dashboard-client");
    const access_token = "Bearer ".concat(this.state.token);
    const doctor = await fetch(
      `http://127.0.0.1:8000/api/client/exams/${this.state.id}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: access_token
        },
        body: JSON.stringify({
          message: "Cancel"
        })
      }
    );
    const jsonData = await doctor.json();
    // this.toRefund();
    console.log(jsonData);

    return jsonData;
  };

  detail = () => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(
        `http://127.0.0.1:8000/api/client/exams/${this.state.id}/`,
        {
          headers: { Authorization: access_token }
        }
      )
      .then(response => {
        console.log(response, "detailex");

        this.setState({ exam: this.state.exam.concat(response.data.message) });
      });
  };

  handleLink = () => {
    this.props.history.push(`/client/exam/correspondence/${this.state.id}`);
  };

  handleLinkMessage = () => {
    this.props.history.push(`/client/exam/message/${this.state.id}`);
  };

  componentDidMount() {
    this.detail();
  }

  render() {
    return (
      <div className="container">
        <Detail
          exam={this.state.exam}
          handleLink={this.handleLink}
          handleLinkMessage={this.handleLinkMessage}
          handleCancel={this.handleCancel}
        />
      </div>
    );
  }
}

export default ClientDetailExam;
