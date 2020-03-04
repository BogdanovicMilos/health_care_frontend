import React, { Component } from "react";
import axios from "axios";
import ExamMessage from "../../components/Doctor/Message";
import { NotificationManager } from "react-notifications";

class DoctorMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      client: [],
      messageValue: "",
      selectedFile: null,
      token: sessionStorage.getItem("accessToken"),
      id: this.props.match.params.id
    };
  }

  client = async () => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(
        `https://health-care-backend.herokuapp.com/api/doctor/exams/${this.state.id}/message`,
        {
          headers: { Authorization: access_token }
        }
      )
      .then(response => {
        console.log(response);

        return this.setState({ client: response.data.client });
      })
      .catch(e => {
        console.log(e);
      });
  };

  sendMessage = async () => {
    const access_token = "Bearer ".concat(this.state.token);
    // const data = new FormData()
    // data.append('file', this.state.selectedFile, this.state.selectedFile.name)
    const client = await fetch(
      `https://health-care-backend.herokuapp.com/api/doctor/exams/${this.state.id}/message/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;",
          Authorization: access_token
        },
        body: JSON.stringify({
          message: this.state.messageValue,
          attachment: null
        })
      }
    );
    const jsonData = await client.json();
    console.log(jsonData);
    console.log(client);

    return jsonData;
  };

  handleMessage = e => {
    this.setState({ messageValue: e.target.value });
  };

  onChangeHandler = e => {
    this.setState({
      selectedFile: e.target.files[0],
      loaded: 0
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.messageValue) {
      this.sendMessage();
      this.setState({ messageValue: "" });
      this.client();
      NotificationManager.success("Message Sent", "Successful!", 2000);
    } else {
      NotificationManager.error("Empty Fields", "Failed!", 2000);
    }
    this.props.history.push(`/doctor/exam/correspondence/${this.state.id}`);
  };

  componentDidMount() {
    this.client();
  }

  render() {
    return (
      <div className="container">
        <ExamMessage
          client={this.state.client}
          messageValue={this.state.messageValue}
          handleMessage={this.handleMessage}
          submitValue={this.state.submitValue}
          handleSubmit={this.handleSubmit}
          onChangeHandler={this.onChangeHandler}
        />
      </div>
    );
  }
}

export default DoctorMessage;
