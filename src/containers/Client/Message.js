import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import ExamMessage from "../../components/Client/Message";
import { NotificationManager } from "react-notifications";

class ClientMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctor: [],
      messageValue: "",
      selectedFile: null,
      token: sessionStorage.getItem("accessToken"),
      id: this.props.match.params.id
    };
  }

  doctor = async () => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(
        `http://127.0.0.1:8000/api/client/exams/${this.state.id}/message`,
        {
          headers: { Authorization: access_token }
        }
      )
      .then(response => {
        console.log(response, "message");

        return this.setState({ doctor: response.data.doctor });
      })
      .catch(e => {
        console.log(e);
      });
  };

  sendMessage = async () => {
    const access_token = "Bearer ".concat(this.state.token);
    const doctor = await fetch(
      `http://127.0.0.1:8000/api/client/exams/${this.state.id}/message/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: access_token
        },
        body: JSON.stringify({
          message: this.state.messageValue,
          attachment: null
        })
      }
    );
    const jsonData = await doctor.json();
    return jsonData;
  };

  handleMessage = e => {
    this.setState({ messageValue: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.messageValue) {
      this.sendMessage();
      this.setState({ messageValue: "" });
      this.doctor();
      NotificationManager.success("Message Sent", "Successful!", 2000);
    } else {
      NotificationManager.error("Empty Fields", "Failed!", 2000);
    }
    this.props.history.push(`/client/exam/correspondence/${this.state.id}`);
  };

  onChangeHandler = e => {
    this.setState({
      selectedFile: e.target.files[0],
      loaded: 0
    });
  };

  componentDidMount() {
    this.doctor();
  }

  render() {
    return (
      <div className="container">
        <ExamMessage
          doctor={this.state.doctor}
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

const mapStateToProps = state => {
  const examID = state.getIn(["examReducer", "examID"]);
  return {
    examID
  };
};

export default connect(mapStateToProps)(ClientMessage);
